// app/workout-history/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface WorkoutData {
  workout_id: string
  workout_date: string
  exercise_name: string
  set_number: number
  weight: number
  reps: number
  rpe: number
  is_warmup: boolean
  volume: number
  completed_at: string
}

interface ExerciseGroup {
  exercise_name: string
  sets: WorkoutData[]
  totalVolume: number
  maxWeight: number
}

interface WorkoutGroup {
  date: string
  exercises: ExerciseGroup[]
  totalVolume: number
}

export default function WorkoutHistory() {
  const router = useRouter()
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutData[]>([])
  const [groupedWorkouts, setGroupedWorkouts] = useState<WorkoutGroup[]>([])
  const [selectedExercise, setSelectedExercise] = useState<string>('')
  const [exercises, setExercises] = useState<string[]>([])
  const [dateRange, setDateRange] = useState(30) // days
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (userId) {
      fetchWorkoutHistory()
    }
  }, [userId, selectedExercise, dateRange])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUserId(user.id)
    } else {
      // For testing without auth
      setUserId('test-user-001')
    }
  }

  const fetchWorkoutHistory = async () => {
    if (!userId) return

    setLoading(true)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - dateRange)

    let query = supabase
      .from('workout_history_view')
      .select('*')
      .eq('user_id', userId)
      .gte('workout_date', startDate.toISOString().split('T')[0])
      .order('workout_date', { ascending: false })
      .order('completed_at', { ascending: false })

    if (selectedExercise) {
      query = query.eq('exercise_name', selectedExercise)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching history:', error)
      setLoading(false)
      return
    }

    if (data) {
      setWorkoutHistory(data)

      // Extract unique exercise names
      const uniqueExercises = [...new Set(data.map(d => d.exercise_name))].sort()
      setExercises(uniqueExercises)

      // Group workouts by date and exercise
      const grouped = data.reduce((acc: { [key: string]: WorkoutGroup }, curr) => {
        const dateKey = curr.workout_date
        
        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            exercises: [],
            totalVolume: 0
          }
        }

        let exerciseGroup = acc[dateKey].exercises.find(e => e.exercise_name === curr.exercise_name)
        
        if (!exerciseGroup) {
          exerciseGroup = {
            exercise_name: curr.exercise_name,
            sets: [],
            totalVolume: 0,
            maxWeight: 0
          }
          acc[dateKey].exercises.push(exerciseGroup)
        }

        exerciseGroup.sets.push(curr)
        if (!curr.is_warmup) {
          exerciseGroup.totalVolume += curr.volume || 0
          exerciseGroup.maxWeight = Math.max(exerciseGroup.maxWeight, curr.weight)
          acc[dateKey].totalVolume += curr.volume || 0
        }

        return acc
      }, {})

      setGroupedWorkouts(Object.values(grouped))
    }

    setLoading(false)
  }

  const getProgressionData = (exerciseName: string) => {
    const exerciseData = workoutHistory
      .filter(w => w.exercise_name === exerciseName && !w.is_warmup)
      .reduce((acc: { [key: string]: { maxWeight: number, totalVolume: number } }, curr) => {
        const date = curr.workout_date
        if (!acc[date]) {
          acc[date] = { maxWeight: 0, totalVolume: 0 }
        }
        acc[date].maxWeight = Math.max(acc[date].maxWeight, curr.weight)
        acc[date].totalVolume += curr.volume || 0
        return acc
      }, {})

    return Object.entries(exerciseData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString(),
        ...data
      }))
  }

  const calculatePR = (exerciseName: string) => {
    const exerciseSets = workoutHistory.filter(w => 
      w.exercise_name === exerciseName && !w.is_warmup
    )
    
    if (exerciseSets.length === 0) return null

    const maxWeight = Math.max(...exerciseSets.map(s => s.weight))
    const maxVolume = Math.max(...exerciseSets.map(s => s.volume || 0))
    const bestSet = exerciseSets.find(s => s.weight === maxWeight)

    return { maxWeight, maxVolume, bestSet }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
        <div className="text-xl">Loading workout history...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Workout History</h1>
          <button
            onClick={() => router.push('/strength-tracker')}
            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg"
          >
            Back to Tracker
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 flex gap-4">
          <div>
            <label className="block text-sm mb-1">Exercise</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="bg-gray-700 p-2 rounded"
            >
              <option value="">All Exercises</option>
              {exercises.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Time Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(parseInt(e.target.value))}
              className="bg-gray-700 p-2 rounded"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
          </div>
        </div>

        {/* Personal Records for Selected Exercise */}
        {selectedExercise && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-xl mb-4">Personal Records: {selectedExercise}</h2>
            {(() => {
              const pr = calculatePR(selectedExercise)
              if (!pr) return <div>No data yet for this exercise</div>
              
              return (
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{pr.maxWeight} lbs</div>
                    <div className="text-sm text-gray-400">Max Weight</div>
                    {pr.bestSet && (
                      <div className="text-xs text-gray-500 mt-1">
                        {pr.bestSet.reps} reps @ RPE {pr.bestSet.rpe}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">{pr.maxVolume.toLocaleString()} lbs</div>
                    <div className="text-sm text-gray-400">Max Session Volume</div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Progress Charts for Selected Exercise */}
        {selectedExercise && getProgressionData(selectedExercise).length > 1 && (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-xl mb-4">Progress Over Time</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Max Weight Progression</h3>
                <div className="h-40 flex items-end gap-1">
                  {getProgressionData(selectedExercise).slice(-20).map((data, i) => {
                    const maxInSet = Math.max(...getProgressionData(selectedExercise).map(d => d.maxWeight))
                    const height = (data.maxWeight / maxInSet) * 100
                    return (
                      <div key={i} className="flex-1 relative group">
                        <div 
                          className="bg-orange-600 rounded-t transition-all hover:bg-orange-500"
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {data.maxWeight}lbs
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Volume Progression</h3>
                <div className="h-40 flex items-end gap-1">
                  {getProgressionData(selectedExercise).slice(-20).map((data, i) => {
                    const maxVolume = Math.max(...getProgressionData(selectedExercise).map(d => d.totalVolume))
                    const height = (data.totalVolume / maxVolume) * 100
                    return (
                      <div key={i} className="flex-1 relative group">
                        <div 
                          className="bg-purple-600 rounded-t transition-all hover:bg-purple-500"
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {data.totalVolume.toLocaleString()}lbs
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workout List */}
        <div className="space-y-4">
          {groupedWorkouts.length === 0 ? (
            <div className="bg-gray-800 p-8 rounded-lg text-center text-gray-400">
              No workout history found. Start tracking your workouts!
            </div>
          ) : (
            groupedWorkouts.map((workout) => (
              <div key={workout.date} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {new Date(workout.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Total Volume</div>
                    <div className="text-xl font-semibold text-orange-500">
                      {workout.totalVolume.toLocaleString()} lbs
                    </div>
                  </div>
                </div>

                {workout.exercises.map((exercise) => (
                  <div key={exercise.exercise_name} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-orange-400">{exercise.exercise_name}</h4>
                      <div className="text-sm text-gray-400">
                        {exercise.totalVolume.toLocaleString()} lbs total
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-2 text-sm text-gray-400 mb-1">
                      <div>Set</div>
                      <div>Weight</div>
                      <div>Reps</div>
                      <div>RPE</div>
                      <div>Volume</div>
                      <div>Type</div>
                    </div>
                    
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="grid grid-cols-6 gap-2 text-sm">
                        <div>{set.set_number}</div>
                        <div>{set.weight} lbs</div>
                        <div>{set.reps}</div>
                        <div>{set.rpe}/10</div>
                        <div>{set.volume} lbs</div>
                        <div>{set.is_warmup ? '🔥 Warm-up' : '💪 Working'}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-4">Period Summary</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {groupedWorkouts.length}
              </div>
              <div className="text-sm text-gray-400">Workouts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {workoutHistory.filter(s => !s.is_warmup).length}
              </div>
              <div className="text-sm text-gray-400">Total Sets</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">
                {workoutHistory
                  .filter(s => !s.is_warmup)
                  .reduce((total, set) => total + (set.volume || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Volume (lbs)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {exercises.length}
              </div>
              <div className="text-sm text-gray-400">Exercises Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}