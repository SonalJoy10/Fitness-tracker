import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProgressLog } from '../models/progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<ProgressLog[]>([]);
  public progress$ = this.progressSubject.asObservable();

  private mockProgress: ProgressLog[] = [
    {
      id: '1',
      userId: 'user1',
      workoutId: '1',
      workoutTitle: 'Chest & Triceps Blast',
      date: '2026-01-20',
      duration: 45,
      caloriesBurned: 280,
      exercises: [
        {
          exerciseId: 'ex1',
          name: 'Bench Press',
          plannedSets: 4,
          plannedReps: 8,
          actualSets: 4,
          actualReps: 8,
          weight: 100,
          completed: true
        },
        {
          exerciseId: 'ex2',
          name: 'Incline Dumbbell Press',
          plannedSets: 3,
          plannedReps: 10,
          actualSets: 3,
          actualReps: 10,
          weight: 30,
          completed: true
        }
      ],
      notes: 'Good workout, feeling strong'
    },
    {
      id: '2',
      userId: 'user1',
      workoutId: '2',
      workoutTitle: 'Back & Biceps Strength',
      date: '2026-01-18',
      duration: 50,
      caloriesBurned: 320,
      exercises: [
        {
          exerciseId: 'ex5',
          name: 'Deadlifts',
          plannedSets: 4,
          plannedReps: 6,
          actualSets: 4,
          actualReps: 6,
          weight: 140,
          completed: true
        }
      ],
      notes: 'PR on deadlifts!'
    },
    {
      id: '3',
      userId: 'user1',
      workoutId: '3',
      workoutTitle: 'Legs & Glutes Power',
      date: '2026-01-15',
      duration: 55,
      caloriesBurned: 350,
      exercises: [
        {
          exerciseId: 'ex9',
          name: 'Squats',
          plannedSets: 4,
          plannedReps: 8,
          actualSets: 3,
          actualReps: 8,
          weight: 120,
          completed: false
        }
      ],
      notes: 'Legs were a bit tired'
    }
  ];

  constructor() {
    this.progressSubject.next(this.mockProgress);
  }

  // Get all progress logs
  getProgress(): Observable<ProgressLog[]> {
    return of(this.mockProgress);
  }

  // Get progress by user ID
  getProgressByUserId(userId: string): Observable<ProgressLog[]> {
    return of(this.mockProgress.filter(p => p.userId === userId));
  }

  // Get progress by date range
  getProgressByDateRange(userId: string, startDate: string, endDate: string): Observable<ProgressLog[]> {
    return of(
      this.mockProgress.filter(
        p => p.userId === userId && p.date >= startDate && p.date <= endDate
      )
    );
  }

  // Get progress for specific workout
  getProgressByWorkout(workoutId: string): Observable<ProgressLog[]> {
    return of(this.mockProgress.filter(p => p.workoutId === workoutId));
  }

  // Add new progress log
  addProgressLog(log: ProgressLog): Observable<ProgressLog> {
    this.mockProgress.push(log);
    this.progressSubject.next(this.mockProgress);
    return of(log);
  }

  // Update progress log
  updateProgressLog(id: string, log: ProgressLog): Observable<ProgressLog> {
    const index = this.mockProgress.findIndex(p => p.id === id);
    if (index > -1) {
      this.mockProgress[index] = log;
      this.progressSubject.next(this.mockProgress);
    }
    return of(log);
  }

  // Get progress statistics
  getStatistics(userId: string): Observable<any> {
    const userProgress = this.mockProgress.filter(p => p.userId === userId);
    const stats = {
      totalWorkouts: userProgress.length,
      totalDuration: userProgress.reduce((sum, p) => sum + p.duration, 0),
      totalCalories: userProgress.reduce((sum, p) => sum + (p.caloriesBurned || 0), 0),
      averageWorkoutDuration: Math.round(
        userProgress.reduce((sum, p) => sum + p.duration, 0) / (userProgress.length || 1)
      ),
      lastWorkoutDate: userProgress.length > 0 ? userProgress[userProgress.length - 1].date : null
    };
    return of(stats);
  }
}
