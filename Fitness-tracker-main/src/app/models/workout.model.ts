export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number; // in minutes
  videoUrl?: string;
  description?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  exercises: Exercise[];
  targetMuscles: string[];
  imageUrl?: string;
  createdDate?: string;
}
