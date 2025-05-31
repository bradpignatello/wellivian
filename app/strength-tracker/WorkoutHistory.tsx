// app/strength-tracker/WorkoutHistory.tsx

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type HistoryEntry = {
  workout_date: string;
  exercise_name: string;
  weight: number;
  reps: number;
  volume: number;
};

export function WorkoutHistory({ currentExercise }: { currentExercise: string }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(currentExercise);

  useEffect(() => {
    setSelectedExercise(currentExercise);
  }, [currentExercise]);

  useEffect(() => {
    fetchHistory();
  }, [selectedExercise]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      // Get last 30 days of workouts for this exercise
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('exercise_progress')
        .select('*')
        .eq('exercise_name', selectedExercise)
        .eq('user_id', 'default-user')
        .gte('workout_date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('workout_date', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setHistory(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group history by date
  const groupedHistory = history.reduce((acc, entry) => {
    const date = entry.workout_date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, HistoryEntry[]>);

  // Get personal record
  const personalRecord = history.reduce((max, entry) => 
    entry.weight > (max?.weight || 0) ? entry : max
  , null as HistoryEntry | null);

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Workout History</h3>
      
      {/* Personal Record */}
      {personalRecord && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-sm font-semibold text-yellow-800">Personal Record</div>
          <div className="text-lg font-bold text-yellow-900">
            {personalRecord.weight} lbs × {personalRecord.reps} reps
          </div>
          <div className="text-xs text-yellow-700">
            {new Date(personalRecord.workout_date).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Exercise Stats */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm font-semibold text-blue-800 mb-2">{selectedExercise} Stats</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Sessions:</span>
            <span className="font-medium ml-1">{Object.keys(groupedHistory).length}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Sets:</span>
            <span className="font-medium ml-1">{history.length}</span>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : Object.keys(groupedHistory).length === 0 ? (
          <div className="text-center text-gray-500">No history yet</div>
        ) : (
          Object.entries(groupedHistory).map(([date, entries]) => (
            <div key={date} className="border-b pb-3">
              <div className="font-medium text-sm text-gray-700 mb-1">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className="space-y-1">
                {entries.map((entry, idx) => (
                  <div key={idx} className="text-sm flex justify-between">
                    <span>Set {idx + 1}:</span>
                    <span className="font-medium">
                      {entry.weight} lbs × {entry.reps} reps
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
