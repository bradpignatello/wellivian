'use client'

import { useState, useEffect } from 'react'

export default function StrengthTracker() {
  const [activeWorkout, setActiveWorkout] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState<any[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [restTimer, setRestTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [supersetMode, setSupersetMode] = useState(true)
  const [workoutDuration, setWorkoutDuration] = useState(0)
  const [showExercisePicker, setShowExercisePicker] = useState(false)
  const [savedTemplates, setSavedTemplates] = useState<any[]>([])
  const [templateName, setTemplateName] = useState('')
  const [prs, setPrs] = useState<any[]>([])
  const [timerPhase, setTimerPhase] = useState<'rest' | 'switch'>('rest')

  // Exercise categories with more exercises
  const EXERCISE_CATEGORIES = {
    'Compound Upper': [
      'Weighted Pull-ups', 'Pull-ups', 'Chin-ups', 'Bench Press', 
      'Overhead Press', 'Dips', 'Muscle-ups'
    ],
    'Compound Lower': [
      'Deadlifts', 'Squats', 'Front Squats', 'Bulgarian Split Squats', 
      'Lunges', 'Step-ups', 'Goblet Squats', 'Romanian Deadlifts'
    ],
    'Pull': [
      'Barbell Rows', 'Single Arm DB Row', 'Cable Rows', 'T-Bar Rows',
      'Face Pulls', 'Lat Pulldowns', 'Seated Cable Rows', 'Kroc Rows'
    ],
    'Push': [
      'Incline DB Press', 'DB Shoulder Press', 'Cable Flyes', 'Dips',
      'Close-Grip Bench', 'Overhead Press', 'Arnold Press', 'Cable Crossovers'
    ],
    'Core': [
      'Hanging Leg Raises', 'Ab Wheel', 'Planks', 'Cable Crunches',
      'Russian Twists', 'Dead Bugs', 'Pallof Press', 'Dragon Flags'
    ],
    'Arms': [
      'Curls', 'Hammer Curls', 'Preacher Curls', 'Cable Curls',
      'Tricep Extensions', 'Overhead Tricep', 'Cable Tricep', '21s'
    ],
    'Legs': [
      'Leg Press', 'Calf Raises', 'Leg Curls', 'Leg Extensions',
      'Walking Lunges', 'Box Jumps', 'Single Leg Press', 'Nordic Curls'
    ]
  }

  // Your preferred exercises
  const YOUR_EXERCISES = [
    { name: 'Weighted Pull-ups', category: 'Compound Upper', defaultRest: 180 },
    { name: 'Deadlifts', category: 'Compound Lower', defaultRest: 180 },
    { name: 'Bulgarian Split Squats', category: 'Compound Lower', defaultRest: 180 },
    { name: 'Incline DB Bench', category: 'Push', defaultRest: 180 },
    { name: 'Single Arm DB Row', category: 'Pull', defaultRest: 180 },
    { name: 'Incline DB Press', category: 'Push', defaultRest: 180 },
    { name: 'Curls', category: 'Arms', defaultRest: 180 },
    { name: 'Hanging Leg Raises', category: 'Core', defaultRest: 180 }
  ]

  // Timer countdown with phase tracking
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          // At 90 seconds, alert to switch exercises
          if (supersetMode && prev === 90 && timerPhase === 'rest') {
            if ('vibrate' in navigator) {
              navigator.vibrate(100)
            }
            setTimerPhase('switch')
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isResting, restTimer, supersetMode, timerPhase])

  const handleTimerComplete = () => {
    setIsResting(false)
    setTimerPhase('rest')
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }

  // Workout duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeWorkout) {
      interval = setInterval(() => {
        setWorkoutDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeWorkout])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startWorkout = () => {
    if (selectedExercises.length === 0) {
      alert('Please select exercises first!')
      return
    }
    setActiveWorkout(true)
    setWorkoutDuration(0)
    setPrs([])
  }

  const endWorkout = () => {
    setActiveWorkout(false)
    // Show PR summary if any
    if (prs.length > 0) {
      alert(`Workout Complete! You hit ${prs.length} PRs today! 💪`)
    }
  }

  const addExercise = (exercise: any) => {
    setSelectedExercises([...selectedExercises, { ...exercise, sets: [] }])
  }

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index))
  }

  const saveTemplate = () => {
    if (templateName && selectedExercises.length > 0) {
      const newTemplate = {
        name: templateName,
        exercises: selectedExercises.map(e => ({ name: e.name, category: e.category, defaultRest: e.defaultRest }))
      }
      setSavedTemplates([...savedTemplates, newTemplate])
      setTemplateName('')
      alert('Template saved!')
    }
  }

  const loadTemplate = (template: any) => {
    setSelectedExercises(template.exercises.map((e: any) => ({ ...e, sets: [] })))
  }

  const logSet = (weight: number, reps: number) => {
    const updatedExercises = [...selectedExercises]
    const currentExercise = updatedExercises[currentExerciseIndex]
    
    // Check if it's a PR (simplified check)
    const previousSets = currentExercise.sets || []
    const isPR = previousSets.length === 0 || weight > Math.max(...previousSets.map((s: any) => s.weight))
    
    if (isPR) {
      setPrs([...prs, { exercise: currentExercise.name, weight, reps }])
    }
    
    currentExercise.sets.push({ weight, reps, setNumber: currentSet })
    setSelectedExercises(updatedExercises)
    
    // Start rest timer
    setRestTimer(180) // Always 3 minutes for superset
    setIsResting(true)
    setTimerPhase('rest')
    
    // Move to next set
    if (currentSet < 3) {
      setCurrentSet(currentSet + 1)
    } else {
      // Completed all sets for this exercise
      setCurrentSet(1)
      if (currentExerciseIndex < selectedExercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
      } else {
        // Workout complete
        endWorkout()
      }
    }
  }

  const getCurrentExercisePair = () => {
    if (!supersetMode) return null
    const pairIndex = Math.floor(currentExerciseIndex / 2) * 2
    return {
      first: selectedExercises[pairIndex],
      second: selectedExercises[pairIndex + 1]
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Strength Tracker</h1>
              <a href="/" className="text-sm text-gray-400 hover:text-gray-300">
                ← Back to Home
              </a>
            </div>
            {activeWorkout && (
              <div className="text-right">
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-xl font-bold">{formatTime(workoutDuration)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!activeWorkout ? (
          // Pre-workout screen
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Train?</h2>
              <p className="text-gray-400 mb-8">
                Build your workout and crush it.
              </p>
              
              <button
                onClick={startWorkout}
                disabled={selectedExercises.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-8 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105"
              >
                Start Workout
              </button>
              
              <div className="mt-6 flex justify-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supersetMode}
                    onChange={(e) => setSupersetMode(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Superset Mode (3 min paired)</span>
                </label>
              </div>
            </div>

            {/* Saved Templates */}
            {savedTemplates.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Saved Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => loadTemplate(template)}
                      className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-left"
                    >
                      <p className="font-semibold">{template.name}</p>
                      <p className="text-sm text-gray-400">
                        {template.exercises.length} exercises
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Exercises */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Your Workout {selectedExercises.length > 0 && `(${selectedExercises.length} exercises)`}
                </h3>
                <button
                  onClick={() => setShowExercisePicker(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  + Add Exercise
                </button>
              </div>

              {selectedExercises.length > 0 ? (
                <>
                  <div className="space-y-2 mb-4">
                    {selectedExercises.map((exercise, index) => (
                      <div key={index} className="bg-gray-700 rounded p-3 flex justify-between items-center">
                        <div>
                          <span className="font-semibold">{exercise.name}</span>
                          <span className="text-sm text-gray-400 ml-2">({exercise.category})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {supersetMode && index % 2 === 1 && (
                            <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                              Paired with {selectedExercises[index - 1]?.name}
                            </span>
                          )}
                          <button
                            onClick={() => removeExercise(index)}
                            className="text-red-400 hover:text-red-300 text-xl"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Save as Template */}
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Template name..."
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="flex-1 bg-gray-700 rounded px-3 py-2"
                    />
                    <button
                      onClick={saveTemplate}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                    >
                      Save Template
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  No exercises selected. Click "+ Add Exercise" to build your workout!
                </p>
              )}
            </div>
          </div>
        ) : (
          // Active workout screen
          <div className="space-y-8">
            {/* Rest Timer */}
            {isResting && (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl text-gray-400 mb-4">
                  {timerPhase === 'rest' ? 'Rest Time' : 'Switch Exercises!'}
                </h3>
                <p className="text-7xl font-bold text-blue-500 mb-4">{formatTime(restTimer)}</p>
                
                {supersetMode && (
                  <div className="space-y-2">
                    {restTimer > 90 ? (
                      <p className="text-gray-400">Switch exercises at 1:30</p>
                    ) : (
                      <p className="text-yellow-400 animate-pulse">
                        Do: {getCurrentExercisePair()?.second?.name || 'Next exercise'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Current Exercise */}
            {!isResting && selectedExercises[currentExerciseIndex] && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedExercises[currentExerciseIndex].name}
                </h2>
                <p className="text-gray-400 mb-6">Set {currentSet} of 3</p>
                
                <SetLogger onLog={logSet} />
                
                {/* Previous sets */}
                {selectedExercises[currentExerciseIndex].sets.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h4 className="text-sm text-gray-400 mb-2">Previous Sets</h4>
                    {selectedExercises[currentExerciseIndex].sets.map((set: any, i: number) => (
                      <p key={i} className="text-sm">
                        Set {set.setNumber}: {set.weight} lbs × {set.reps} reps
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Exercise Progress */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm text-gray-400 mb-2">Workout Progress</h4>
              <div className="flex gap-2 flex-wrap">
                {selectedExercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`text-xs px-2 py-1 rounded ${
                      index < currentExerciseIndex ? 'bg-green-600' :
                      index === currentExerciseIndex ? 'bg-blue-600' :
                      'bg-gray-700'
                    }`}
                  >
                    {exercise.name}
                  </div>
                ))}
              </div>
            </div>

            {/* End Workout Button */}
            <button
              onClick={endWorkout}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg"
            >
              End Workout
            </button>
          </div>
        )}
      </div>

      {/* Exercise Picker Modal */}
      {showExercisePicker && (
        <ExercisePicker
          onSelect={(exercise) => {
            addExercise(exercise)
            setShowExercisePicker(false)
          }}
          onClose={() => setShowExercisePicker(false)}
          categories={EXERCISE_CATEGORIES}
          yourExercises={YOUR_EXERCISES}
        />
      )}
    </main>
  )
}

// Set Logger Component
function SetLogger({ onLog }: { onLog: (weight: number, reps: number) => void }) {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')

  const handleSubmit = () => {
    if (weight && reps) {
      onLog(Number(weight), Number(reps))
      setWeight('')
      setReps('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Weight (lbs)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-4 py-3 text-2xl text-center font-bold"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-4 py-3 text-2xl text-center font-bold"
            placeholder="0"
          />
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-xl font-semibold"
      >
        Log Set
      </button>
    </div>
  )
}

// Exercise Picker Modal
function ExercisePicker({ onSelect, onClose, categories, yourExercises }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Select Exercise</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Your Exercises */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">YOUR EXERCISES</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {yourExercises.map((exercise: any) => (
                <button
                  key={exercise.name}
                  onClick={() => onSelect(exercise)}
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-left"
                >
                  <p className="font-semibold">{exercise.name}</p>
                  <p className="text-xs text-gray-300">{exercise.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-3">ALL EXERCISES BY CATEGORY</h4>
            <div className="space-y-2">
              {Object.entries(categories).map(([category, exercises]) => (
                <div key={category}>
                  <button
                    onClick={() => setSelectedCategory(
                      selectedCategory === category ? null : category
                    )}
                    className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-3 rounded-lg"
                  >
                    <span className="font-semibold">{category}</span>
                    <span className="text-gray-400">
                      {selectedCategory === category ? '−' : '+'}
                    </span>
                  </button>
                  
                  {selectedCategory === category && (
                    <div className="mt-2 grid grid-cols-2 gap-2 pl-4">
                      {(exercises as string[]).map((exercise) => (
                        <button
                          key={exercise}
                          onClick={() => onSelect({ 
                            name: exercise, 
                            category,
                            defaultRest: 180,
                            sets: []
                          })}
                          className="bg-gray-600 hover:bg-gray-500 p-2 rounded text-sm text-left"
                        >
                          {exercise}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}