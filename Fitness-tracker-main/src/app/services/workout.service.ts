import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { WorkoutPlan, Exercise } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutSubject = new BehaviorSubject<WorkoutPlan[]>([]);
  public workout$ = this.workoutSubject.asObservable();

  private mockWorkouts: WorkoutPlan[] = [
    {
      id: '1',
      title: 'Chest & Triceps Blast',
      description: 'Full chest and triceps workout for muscle building',
      difficulty: 'Intermediate',
      duration: 45,
      targetMuscles: ['Chest', 'Triceps'],
      imageUrl: 'assets/images/workouts/chest.svg',
      exercises: [
        {
          id: 'ex1',
          name: 'Bench Press',
          sets: 4,
          reps: 8,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
          description: 'Lie flat on bench and press barbell up'
        },
        {
          id: 'ex2',
          name: 'Incline Dumbbell Press',
          sets: 3,
          reps: 10,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/FfJIivR1v2s',
          description: 'Press dumbbells from incline position'
        },
        {
          id: 'ex3',
          name: 'Cable Flyes',
          sets: 3,
          reps: 12,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/eoCs0dP_chE',
          description: 'Fly cables together focusing on chest squeeze'
        },
        {
          id: 'ex4',
          name: 'Tricep Dips',
          sets: 3,
          reps: 10,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/0326qNH-olw',
          description: 'Use parallel bars to perform dips'
        }
      ]
    },
    {
      id: '2',
      title: 'Back & Biceps Strength',
      description: 'Comprehensive back and biceps training',
      difficulty: 'Intermediate',
      duration: 50,
      targetMuscles: ['Back', 'Biceps'],
      imageUrl: 'assets/images/workouts/back.svg',
      exercises: [
        {
          id: 'ex5',
          name: 'Deadlifts',
          sets: 4,
          reps: 6,
          duration: 12,
          videoUrl: 'https://www.youtube.com/embed/r4MzxtBKyNE',
          description: 'Lift barbell from ground to hip level'
        },
        {
          id: 'ex6',
          name: 'Pull-ups',
          sets: 4,
          reps: 8,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/xjH3b79Svsw',
          description: 'Pull your body up on horizontal bar'
        },
        {
          id: 'ex7',
          name: 'Barbell Rows',
          sets: 3,
          reps: 10,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/sTnkF1tI_QU',
          description: 'Row barbell to chest from bent position'
        },
        {
          id: 'ex8',
          name: 'Barbell Curls',
          sets: 3,
          reps: 10,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/VvGb7_6Tl_c',
          description: 'Curl barbell focusing on biceps'
        }
      ]
    },
    {
      id: '3',
      title: 'Legs & Glutes Power',
      description: 'Lower body strength and muscle building',
      difficulty: 'Advanced',
      duration: 60,
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
      imageUrl: 'assets/images/workouts/legs.svg',
      exercises: [
        {
          id: 'ex9',
          name: 'Squats',
          sets: 4,
          reps: 8,
          duration: 12,
          videoUrl: 'https://www.youtube.com/embed/QZnR2bfKMCA',
          description: 'Lower body in squat position'
        },
        {
          id: 'ex10',
          name: 'Romanian Deadlifts',
          sets: 3,
          reps: 10,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/2SHsk9AzdjA',
          description: 'Hip hinge movement with barbell'
        },
        {
          id: 'ex11',
          name: 'Leg Press',
          sets: 3,
          reps: 12,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/IZxyjW7MIAI',
          description: 'Push weight away using leg press machine'
        },
        {
          id: 'ex12',
          name: 'Leg Curls',
          sets: 3,
          reps: 12,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/1Sxc2lZ-5o4',
          description: 'Curl legs to target hamstrings'
        }
      ]
    },
    {
      id: '4',
      title: 'Shoulders & Core',
      description: 'Shoulder development and core stability',
      difficulty: 'Beginner',
      duration: 40,
      targetMuscles: ['Shoulders', 'Core'],
      imageUrl: 'assets/images/workouts/shoulders.svg',
      exercises: [
        {
          id: 'ex13',
          name: 'Overhead Press',
          sets: 4,
          reps: 8,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDk',
          description: 'Press barbell overhead from shoulder'
        },
        {
          id: 'ex14',
          name: 'Lateral Raises',
          sets: 3,
          reps: 12,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/q9B_W__L2Qw',
          description: 'Raise dumbbells to side at shoulder height'
        },
        {
          id: 'ex15',
          name: 'Planks',
          sets: 3,
          reps: 1,
          duration: 10,
          videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
          description: 'Hold plank position for time'
        }
      ]
    },
    {
      id: '5',
      title: 'Full Body Cardio Mix',
      description: 'Cardio and functional training',
      difficulty: 'Beginner',
      duration: 30,
      targetMuscles: ['Full Body'],
      imageUrl: 'assets/images/workouts/cardio.svg',
      exercises: [
        {
          id: 'ex16',
          name: 'Jumping Jacks',
          sets: 3,
          reps: 20,
          duration: 5,
          videoUrl: 'https://www.youtube.com/embed/g8oJvRJBJ1s',
          description: 'Full body cardio exercise'
        },
        {
          id: 'ex17',
          name: 'Burpees',
          sets: 3,
          reps: 15,
          duration: 8,
          videoUrl: 'https://www.youtube.com/embed/XZvU8-DPvZg',
          description: 'Explosive full body movement'
        },
        {
          id: 'ex18',
          name: 'Mountain Climbers',
          sets: 3,
          reps: 20,
          duration: 6,
          videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM',
          description: 'Core and cardio exercise'
        }
      ]
    }
  ];

  constructor() {
    this.workoutSubject.next(this.mockWorkouts);
  }

  // Get all workouts
  getWorkouts(): Observable<WorkoutPlan[]> {
    return of(this.mockWorkouts);
  }

  // Get single workout by ID
  getWorkoutById(id: string): Observable<WorkoutPlan | undefined> {
    return of(this.mockWorkouts.find(w => w.id === id));
  }

  // Search workouts by difficulty
  getWorkoutsByDifficulty(difficulty: string): Observable<WorkoutPlan[]> {
    return of(this.mockWorkouts.filter(w => w.difficulty === difficulty));
  }

  // Add new workout (for future backend integration)
  addWorkout(workout: WorkoutPlan): Observable<WorkoutPlan> {
    this.mockWorkouts.push(workout);
    this.workoutSubject.next(this.mockWorkouts);
    return of(workout);
  }

  // Update workout
  updateWorkout(id: string, workout: WorkoutPlan): Observable<WorkoutPlan> {
    const index = this.mockWorkouts.findIndex(w => w.id === id);
    if (index > -1) {
      this.mockWorkouts[index] = workout;
      this.workoutSubject.next(this.mockWorkouts);
    }
    return of(workout);
  }
}
