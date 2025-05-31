// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type Workout = {
  id: string;
  user_id: string;
  workout_date: string;
  created_at: string;
  notes?: string;
};

export type WorkoutExercise = {
  id: string;
  workout_id: string;
  exercise_name: string;
  exercise_order: number;
  notes?: string;
};

export type WorkoutSet = {
  id: string;
  exercise_id: string;
  set_number: number;
  weight: number;
  reps: number;
  is_warmup: boolean;
};