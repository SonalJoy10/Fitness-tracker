export interface ProgressLog {
  id: string;
  userId: string;
  workoutId: string;
  workoutTitle: string;
  date: string;
  exercises: ExerciseProgress[];
  duration: number; // actual duration in minutes
  caloriesBurned?: number;
  notes?: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  name: string;
  plannedSets: number;
  plannedReps: number;
  actualSets: number;
  actualReps: number;
  weight?: number; // in kg
  completed: boolean;
}

