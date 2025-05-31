// app/hooks/useWorkoutSuggestions.tsx

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type WorkoutSuggestion = {
  exercise: string;
  lastWorkout: {
    date: string;
    sets: Array<{
      weight: number;
      reps: number;
      is_warmup: boolean;
    }>;
  } | null;
  recommendation: string;
  progressionType: 'increase-weight' | 'increase-reps' | 'maintain' | 'deload' | 'no-data';
};

// Simple component that fetches its own data
export function WorkoutSuggestions({ exerciseName }: { exerciseName: string }) {
  const [suggestion, setSuggestion] = useState<WorkoutSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchLastWorkout = async () => {
      if (!exerciseName) return;
      
      setIsLoading(true);
      try {
        // Get the most recent workout for this exercise
        const { data: exercises } = await supabase
          .from('workout_exercises')
          .select(`
            id,
            exercise_name,
            workout_id,
            workouts!inner(workout_date)
          `)
          .eq('exercise_name', exerciseName)
          .order('workouts(workout_date)', { ascending: false })
          .limit(1);

        if (!exercises || exercises.length === 0) {
          if (mounted) {
            setSuggestion({
              exercise: exerciseName,
              lastWorkout: null,
              recommendation: 'No previous workout data. Start with a comfortable weight.',
              progressionType: 'no-data'
            });
          }
          return;
        }

        const exerciseRecord = exercises[0];

        // Get all sets from that workout
        const { data: sets } = await supabase
          .from('workout_sets')
          .select('weight, reps, is_warmup')
          .eq('exercise_id', exerciseRecord.id)
          .order('set_number');

        if (!sets || sets.length === 0) {
          if (mounted) {
            setSuggestion({
              exercise: exerciseName,
              lastWorkout: null,
              recommendation: 'No set data found from last workout.',
              progressionType: 'no-data'
            });
          }
          return;
        }

        // Calculate days since last workout
        const lastDate = new Date(exerciseRecord.workouts.workout_date);
        const today = new Date();
        const daysSince = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        // Generate recommendation based on time
        let recommendation = '';
        let progressionType: WorkoutSuggestion['progressionType'] = 'maintain';

        const workingSets = sets.filter(s => !s.is_warmup);
        const maxWeight = Math.max(...workingSets.map(s => s.weight));

        if (daysSince === 0) {
          recommendation = `You already worked out today! Consider resting or doing different muscle groups.`;
          progressionType = 'maintain';
        } else if (daysSince <= 3) {
          recommendation = `Last workout: ${daysSince} days ago. Maintain ${maxWeight} lbs or add 1-2 reps.`;
          progressionType = 'increase-reps';
        } else if (daysSince <= 7) {
          const increment = getWeightIncrement(exerciseName, maxWeight);
          recommendation = `Last workout: ${daysSince} days ago. Try adding ${increment} lbs (${maxWeight} → ${maxWeight + increment} lbs).`;
          progressionType = 'increase-weight';
        } else if (daysSince <= 14) {
          recommendation = `Last workout: ${daysSince} days ago. Start with your previous weight: ${maxWeight} lbs.`;
          progressionType = 'maintain';
        } else {
          const deloadWeight = Math.round(maxWeight * 0.9 / 5) * 5;
          recommendation = `Last workout: ${daysSince} days ago. Consider deloading to ${deloadWeight} lbs (90% of ${maxWeight} lbs).`;
          progressionType = 'deload';
        }

        if (mounted) {
          setSuggestion({
            exercise: exerciseName,
            lastWorkout: {
              date: exerciseRecord.workouts.workout_date,
              sets: sets
            },
            recommendation,
            progressionType
          });
        }

      } catch (error) {
        console.error('Error fetching workout data:', error);
        if (mounted) {
          setSuggestion({
            exercise: exerciseName,
            lastWorkout: null,
            recommendation: 'Error loading previous workout data.',
            progressionType: 'no-data'
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLastWorkout();

    // Cleanup function to prevent setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, [exerciseName]); // Only re-run when exercise name changes

  if (isLoading) {
    return (
      <div className="mb-4 p-4 bg-gray-50 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!suggestion) return null;

  const getProgressionColor = (type: WorkoutSuggestion['progressionType']) => {
    switch (type) {
      case 'increase-weight': return 'bg-green-100 text-green-800 border-green-300';
      case 'increase-reps': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'maintain': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'deload': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'no-data': return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`mb-4 p-4 rounded-lg border ${getProgressionColor(suggestion.progressionType)}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-700">Workout Suggestion</h4>
        <span className="text-xs font-medium uppercase">
          {suggestion.progressionType.replace('-', ' ')}
        </span>
      </div>
      
      <p className="text-sm mb-3">{suggestion.recommendation}</p>
      
      {suggestion.lastWorkout && (
        <div className="mt-3 pt-3 border-t border-current border-opacity-20">
          <div className="text-xs font-medium mb-2">Previous sets:</div>
          <div className="space-y-1">
            {suggestion.lastWorkout.sets.map((set, idx) => (
              <div key={idx} className="text-sm">
                {set.is_warmup && <span className="text-xs bg-current bg-opacity-20 px-1 rounded mr-2">Warmup</span>}
                <span className="font-medium">{set.weight} lbs × {set.reps} reps</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function for weight increments
function getWeightIncrement(exercise: string, currentWeight: number): number {
  const upperBodyExercises = ['Bench Press', 'Incline Bench', 'Incline Press', 'Overhead Press', 'Rows', 'Single Arm Rows'];
  const smallMuscleExercises = ['Curls', 'Tricep Extensions', 'Lateral Raises'];
  
  if (smallMuscleExercises.some(e => exercise.includes(e))) {
    return 2.5; // Small increment for isolation exercises
  } else if (upperBodyExercises.some(e => exercise.includes(e))) {
    return currentWeight < 100 ? 5 : 10; // 5-10 lbs for upper body
  } else {
    return currentWeight < 200 ? 10 : 20; // 10-20 lbs for lower body
  }
}