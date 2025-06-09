'use client';

import { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import { supabase } from '@/lib/supabase';

type Set = {
  warmup: boolean;
  weight: string;
  reps: string;
};

type ExerciseData = {
  sets: Set[];
  notes: string;
};

type WorkoutData = {
  [key: string]: ExerciseData;
};

type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' | 'quads' | 'hamstrings' | 'glutes' | 'core' | 'calves';

export default function StrengthTracker() {
  const defaultExercises = [
    'Deadlifts',
    'Hanging Leg Lifts',
    'Bulgarian Split Squats',
    'Weighted Pull-ups',
    'Incline Bench',
    'Single Arm Rows',
    'Incline Press',
    'Curls'
  ];

  const [exercises, setExercises] = useState(defaultExercises);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(3);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const commonExerciseMuscleGroups: { [key: string]: MuscleGroup[] } = {
    'Bench Press': ['chest', 'triceps', 'shoulders'],
    'Incline Bench': ['chest', 'shoulders', 'triceps'],
    'Incline Press': ['chest', 'shoulders', 'triceps'],
    'Dips': ['chest', 'triceps', 'shoulders'],
    'Overhead Press': ['shoulders', 'triceps', 'core'],
    'Push-ups': ['chest', 'triceps', 'shoulders'],
    'Pull-ups': ['back', 'biceps', 'core'],
    'Weighted Pull-ups': ['back', 'biceps', 'core'],
    'Rows': ['back', 'biceps'],
    'Single Arm Rows': ['back', 'biceps', 'core'],
    'Lat Pulldown': ['back', 'biceps'],
    'Face Pulls': ['back', 'shoulders'],
    'Squats': ['quads', 'glutes', 'core'],
    'Deadlifts': ['back', 'hamstrings', 'glutes', 'core'],
    'Bulgarian Split Squats': ['quads', 'glutes', 'hamstrings', 'core'],
    'Lunges': ['quads', 'glutes', 'hamstrings'],
    'Leg Press': ['quads', 'glutes'],
    'Romanian Deadlifts': ['hamstrings', 'glutes', 'back'],
    'Hanging Leg Lifts': ['core'],
    'Planks': ['core'],
    'Ab Wheel': ['core'],
    'Curls': ['biceps'],
    'Bicep Curls': ['biceps'],
    'Hammer Curls': ['biceps'],
    'Tricep Extensions': ['triceps'],
    'Skull Crushers': ['triceps'],
  };

  const [exerciseMuscleGroups, setExerciseMuscleGroups] = useState<{ [key: string]: MuscleGroup[] }>(
    () => {
      const groups: { [key: string]: MuscleGroup[] } = {};
      exercises.forEach(exercise => {
        groups[exercise] = commonExerciseMuscleGroups[exercise] || [];
      });
      return groups;
    }
  );
  
  const [workoutData, setWorkoutData] = useState<WorkoutData>(() => {
    const initialData: WorkoutData = {};
    exercises.forEach(exercise => {
      initialData[exercise] = {
        sets: [
          { warmup: false, weight: '', reps: '' },
          { warmup: false, weight: '', reps: '' },
          { warmup: false, weight: '', reps: '' }
        ],
        notes: ''
      };
    });
    return initialData;
  });

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => {
          if (seconds <= 1) {
            setIsTimerRunning(false);
            alert('Rest time is up!');
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);
    } else {
      setIsTimerRunning(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const startTimer = () => {
    if (timerMinutes > 0) {
      setTimerSeconds(timerMinutes * 60);
      setIsTimerRunning(true);
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSet = (setIndex: number, field: 'weight' | 'reps', value: string) => {
    const exercise = exercises[currentExercise];
    if (!exercise || !workoutData[exercise]) return;
    
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        sets: prev[exercise].sets.map((set, index) =>
          index === setIndex ? { ...set, [field]: value } : set
        )
      }
    }));
  };

  const updateWarmup = (setIndex: number, isWarmup: boolean) => {
    const exercise = exercises[currentExercise];
    if (!exercise || !workoutData[exercise]) return;
    
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        sets: prev[exercise].sets.map((set, index) =>
          index === setIndex ? { ...set, warmup: isWarmup } : set
        )
      }
    }));
  };

  const addSet = () => {
    const exercise = exercises[currentExercise];
    if (!exercise || !workoutData[exercise]) return;
    
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        sets: [...prev[exercise].sets, { warmup: false, weight: '', reps: '' }]
      }
    }));
  };

  const deleteSet = (setIndex: number) => {
    const exercise = exercises[currentExercise];
    if (!exercise || !workoutData[exercise]) return;
    
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        sets: prev[exercise].sets.filter((_, index) => index !== setIndex)
      }
    }));
  };

  const updateNotes = (value: string) => {
    const exercise = exercises[currentExercise];
    if (!exercise || !workoutData[exercise]) return;
    
    setWorkoutData(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        notes: value
      }
    }));
  };

  const saveWorkout = async () => {
    try {
      const userId = 'default-user';
      
      const { data: workout, error: workoutError } = await supabase
        .from('workouts')
        .insert({
          user_id: userId,
          notes: `Workout completed with ${exercises.length} exercises`
        })
        .select()
        .single();

      if (workoutError) throw workoutError;

      for (let i = 0; i < exercises.length; i++) {
        const exerciseName = exercises[i];
        const exerciseData = workoutData[exerciseName];
        
        const hasData = exerciseData.sets.some(set => set.weight || set.reps);
        if (!hasData) continue;

        const { data: exercise, error: exerciseError } = await supabase
          .from('workout_exercises')
          .insert({
            workout_id: workout.id,
            exercise_name: exerciseName,
            exercise_order: i,
            notes: exerciseData.notes
          })
          .select()
          .single();

        if (exerciseError) throw exerciseError;

        const setsToInsert = exerciseData.sets
          .filter(set => set.weight || set.reps)
          .map((set, index) => ({
            exercise_id: exercise.id,
            set_number: index + 1,
            weight: parseFloat(set.weight) || 0,
            reps: parseInt(set.reps) || 0,
            is_warmup: set.warmup
          }));

        if (setsToInsert.length > 0) {
          const { error: setsError } = await supabase
            .from('workout_sets')
            .insert(setsToInsert);

          if (setsError) throw setsError;
        }
      }

      console.log('Workout saved successfully!');
      
      const exercise = exercises[currentExercise];
      if (!completedExercises.includes(exercise)) {
        setCompletedExercises([...completedExercises, exercise]);
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('Failed to save workout. Please try again.');
    }
  };

  const getPairingQuality = (exercise1: string, exercise2: string): 'great' | 'good' | 'neutral' | 'avoid' => {
    const muscles1 = exerciseMuscleGroups[exercise1] || [];
    const muscles2 = exerciseMuscleGroups[exercise2] || [];
    
    if (muscles1.length === 0 || muscles2.length === 0) return 'neutral';
    
    const overlap = muscles1.filter(muscle => muscles2.includes(muscle));
    const overlapPercentage = overlap.length / Math.max(muscles1.length, muscles2.length);
    
    const isPushPull = 
      (muscles1.includes('chest') && muscles2.includes('back')) ||
      (muscles1.includes('back') && muscles2.includes('chest')) ||
      (muscles1.includes('triceps') && muscles2.includes('biceps')) ||
      (muscles1.includes('biceps') && muscles2.includes('triceps'));
    
    if (isPushPull || (overlapPercentage === 0 && muscles1.length > 0 && muscles2.length > 0)) {
      return 'great';
    }
    
    if (overlapPercentage > 0.6) {
      return 'avoid';
    }
    
    if (overlapPercentage < 0.3) {
      return 'good';
    }
    
    return 'neutral';
  };

  const getExerciseStatus = (exerciseName: string, index: number) => {
    if (index === currentExercise) return 'current';
    if (completedExercises.includes(exerciseName)) return 'completed';
    
    const currentExerciseName = exercises[currentExercise];
    const pairingQuality = getPairingQuality(currentExerciseName, exerciseName);
    
    return pairingQuality;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-blue-500 text-white border-blue-500';
      case 'completed': return 'bg-gray-300 text-gray-600 border-gray-300';
      case 'great': return 'bg-green-100 text-green-700 border-green-400 ring-2 ring-green-400 ring-opacity-50';
      case 'good': return 'bg-green-50 text-green-600 border-green-300';
      case 'avoid': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-white text-gray-700 border-gray-200';
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const draggedExercise = exercises[draggedIndex];
    const newExercises = [...exercises];
    
    newExercises.splice(draggedIndex, 1);
    newExercises.splice(dropIndex, 0, draggedExercise);
    
    setExercises(newExercises);
    
    if (currentExercise === draggedIndex) {
      setCurrentExercise(dropIndex);
    } else if (draggedIndex < currentExercise && dropIndex >= currentExercise) {
      setCurrentExercise(currentExercise - 1);
    } else if (draggedIndex > currentExercise && dropIndex <= currentExercise) {
      setCurrentExercise(currentExercise + 1);
    }
    
    setDraggedIndex(null);
  };

  const startEditingExercise = (index: number) => {
    setEditingIndex(index);
    setEditValue(exercises[index]);
  };

  const saveExerciseName = () => {
    if (editingIndex !== null && editValue.trim()) {
      const oldName = exercises[editingIndex];
      const newExercises = [...exercises];
      newExercises[editingIndex] = editValue.trim();
      setExercises(newExercises);
      
      const newWorkoutData = { ...workoutData };
      newWorkoutData[editValue.trim()] = newWorkoutData[oldName] || {
        sets: [
          { warmup: false, weight: '', reps: '' },
          { warmup: false, weight: '', reps: '' },
          { warmup: false, weight: '', reps: '' }
        ],
        notes: ''
      };
      delete newWorkoutData[oldName];
      setWorkoutData(newWorkoutData);
      
      const newMuscleGroups = { ...exerciseMuscleGroups };
      newMuscleGroups[editValue.trim()] = commonExerciseMuscleGroups[editValue.trim()] || newMuscleGroups[oldName] || [];
      delete newMuscleGroups[oldName];
      setExerciseMuscleGroups(newMuscleGroups);
      
      if (completedExercises.includes(oldName)) {
        setCompletedExercises(completedExercises.map(ex => ex === oldName ? editValue.trim() : ex));
      }
    }
    setEditingIndex(null);
    setEditValue('');
  };

  const addNewExercise = () => {
    const newExerciseName = 'New Exercise';
    setExercises([...exercises, newExerciseName]);
    setWorkoutData({
      ...workoutData,
      [newExerciseName]: {
        sets: [
          { warmup: false, weight: '', reps: '' },
          { warmup: false, weight: '', reps: '' },
          { warmup: false, weight: '', reps: '' }
        ],
        notes: ''
      }
    });
    setCurrentExercise(exercises.length);
    setTimeout(() => startEditingExercise(exercises.length), 100);
  };

  const deleteExercise = (index: number) => {
    if (exercises.length > 1) {
      const exerciseToDelete = exercises[index];
      const newExercises = exercises.filter((_, i) => i !== index);
      setExercises(newExercises);
      
      const newWorkoutData = { ...workoutData };
      delete newWorkoutData[exerciseToDelete];
      setWorkoutData(newWorkoutData);
      
      const newMuscleGroups = { ...exerciseMuscleGroups };
      delete newMuscleGroups[exerciseToDelete];
      setExerciseMuscleGroups(newMuscleGroups);
      
      setCompletedExercises(completedExercises.filter(ex => ex !== exerciseToDelete));
      
      if (currentExercise === index) {
        setCurrentExercise(0);
      } else if (currentExercise > index) {
        setCurrentExercise(currentExercise - 1);
      }
    }
  };

  const exercise = exercises[currentExercise] || exercises[0];
  const data = workoutData[exercise] || { 
    sets: [
      { warmup: false, weight: '', reps: '' },
      { warmup: false, weight: '', reps: '' },
      { warmup: false, weight: '', reps: '' }
    ], 
    notes: '' 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Workout History */}
      <div className="hidden lg:block">
        <WorkoutHistory currentExercise={exercise} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Workout Log</h1>
            
            {/* Timer */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="text-2xl font-semibold font-mono min-w-[80px] text-center">
                {formatTime(timerSeconds)}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="w-12 px-2 py-1 border border-gray-200 rounded-md text-center"
                    value={timerMinutes}
                    onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                    min="0"
                    max="59"
                  />
                  <span className="text-xs text-gray-500">min</span>
                </div>
                <button
                  onClick={startTimer}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start
                </button>
                <button
                  onClick={stopTimer}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Stop
                </button>
                <button
                  onClick={resetTimer}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Exercise Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {exercises.map((ex, index) => {
                const status = getExerciseStatus(ex, index);
                const statusColor = getStatusColor(status);
                
                return (
                  <div 
                    key={`${ex}-${index}`} 
                    className="relative group"
                    draggable={editingIndex !== index}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveExerciseName}
                        onKeyPress={(e) => e.key === 'Enter' && saveExerciseName()}
                        className="px-5 py-3 rounded-lg font-medium border-2 border-blue-500 focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => setCurrentExercise(index)}
                        onDoubleClick={() => startEditingExercise(index)}
                        className={`px-5 py-3 rounded-lg font-medium whitespace-nowrap transition-all border-2 cursor-move ${statusColor} ${
                          draggedIndex === index ? 'opacity-50' : ''
                        }`}
                      >
                        <span className="mr-2 text-xs opacity-50">⋮⋮</span>
                        {ex}
                        {status === 'completed' && ' ✓'}
                      </button>
                    )}
                    
                    {exercises.length > 1 && (
                      <button
                        onClick={() => deleteExercise(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
              
              <button
                onClick={addNewExercise}
                className="px-5 py-3 rounded-lg font-medium whitespace-nowrap transition-all border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
              >
                + Add Exercise
              </button>
            </div>
            
            <div className="flex gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded ring-2 ring-green-400 ring-opacity-50"></div>
                <span className="text-gray-600">Great pairing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-50 border border-green-300 rounded"></div>
                <span className="text-gray-600">Good pairing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-gray-600">Avoid pairing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-gray-600">Completed</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Tip: Double-click to rename • Drag to reorder exercises
            </div>
          </div>

          {/* Exercise Content */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{exercise}</h2>
              <button
                onClick={saveWorkout}
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Workout
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-semibold text-blue-700">Muscle groups: </span>
              <span className="text-sm text-blue-600">
                {exerciseMuscleGroups[exercise]?.join(', ') || 'Not specified'}
              </span>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-5 gap-4 mb-3 text-sm font-semibold text-gray-600 uppercase">
                <div>Set</div>
                <div>Warmup</div>
                <div>Weight (lbs)</div>
                <div>Reps</div>
                <div>Action</div>
              </div>
              
              {data.sets.map((set, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 items-center py-3 border-b border-gray-100">
                  <div className="font-semibold">{index + 1}</div>
                  <div>
                    {index === 0 && (
                      <input
                        type="checkbox"
                        checked={set.warmup}
                        onChange={(e) => updateWarmup(index, e.target.checked)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => updateSet(index, 'weight', e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => updateSet(index, 'reps', e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    {data.sets.length > 1 && (
                      <button
                        onClick={() => deleteSet(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addSet}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-500 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Set
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block font-semibold mb-2">Notes</label>
              <textarea
                value={data.notes}
                onChange={(e) => updateNotes(e.target.value)}
                placeholder="Add notes about this exercise..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
              Workout saved!
            </div>
          )}
          
          {/* AI Chat Interface */}
          <ChatInterface
            exercises={exercises}
            currentExercise={exercise}
            workoutData={workoutData}
            onUpdateExercises={setExercises}
            onSuggestPairing={(pairings) => {
              console.log('AI suggested pairings:', pairings);
            }}
          />
        </div>
      </div>
    </div>
  );
}