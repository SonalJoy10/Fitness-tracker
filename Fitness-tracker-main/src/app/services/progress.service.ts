import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ProgressLog } from '../models/progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<ProgressLog[]>([]);
  public progress$ = this.progressSubject.asObservable();

  private weeklyGoalSubject = new BehaviorSubject<number>(5); // Default 5 workouts per week
  public weeklyGoal$ = this.weeklyGoalSubject.asObservable();

  private readonly STORAGE_KEY = 'fitness_progress_logs';
  private readonly WEEKLY_GOAL_KEY = 'fitness_weekly_goal';

  private mockProgress: ProgressLog[] = [
    {
      id: '1',
      userId: 'user1',
      workoutId: '1',
      workoutTitle: 'Chest & Triceps Blast',
      date: '2026-03-08',
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
      date: '2026-03-07',
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
      date: '2026-03-05',
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
    this.loadFromStorage();
    this.loadWeeklyGoal();
  }

  /**
   * Load progress from localStorage
   */
  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.mockProgress = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored progress:', e);
        this.saveToStorage();
      }
    } else {
      this.saveToStorage();
    }
    this.progressSubject.next(this.mockProgress);
  }

  /**
   * Save progress to localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.mockProgress));
  }

  /**
   * Load weekly goal from localStorage
   */
  private loadWeeklyGoal(): void {
    const stored = localStorage.getItem(this.WEEKLY_GOAL_KEY);
    if (stored) {
      try {
        this.weeklyGoalSubject.next(parseInt(stored, 10));
      } catch (e) {
        console.error('Failed to parse weekly goal:', e);
      }
    }
  }

  /**
   * Save weekly goal to localStorage
   */
  private saveWeeklyGoal(): void {
    localStorage.setItem(this.WEEKLY_GOAL_KEY, this.weeklyGoalSubject.value.toString());
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
    this.saveToStorage();
    this.progressSubject.next(this.mockProgress);
    return of(log);
  }

  // Update progress log
  updateProgressLog(id: string, log: ProgressLog): Observable<ProgressLog> {
    const index = this.mockProgress.findIndex(p => p.id === id);
    if (index > -1) {
      this.mockProgress[index] = log;
      this.saveToStorage();
      this.progressSubject.next(this.mockProgress);
    }
    return of(log);
  }

  /**
   * Delete progress log
   */
  deleteProgressLog(id: string): Observable<boolean> {
    const index = this.mockProgress.findIndex(p => p.id === id);
    if (index > -1) {
      this.mockProgress.splice(index, 1);
      this.saveToStorage();
      this.progressSubject.next(this.mockProgress);
      return of(true);
    }
    return of(false);
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

  /**
   * Get weekly workouts completed
   */
  getWeeklyWorkouts(userId: string): Observable<number> {
    const today = new Date('2026-03-10'); // Using app date
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

    const weekStartStr = this.dateToString(weekStart);
    const weekEndStr = this.dateToString(weekEnd);

    const weeklyWorkouts = this.mockProgress.filter(
      p => p.userId === userId && p.date >= weekStartStr && p.date <= weekEndStr
    );

    return of(weeklyWorkouts.length);
  }

  /**
   * Set weekly workout goal
   */
  setWeeklyGoal(goal: number): Observable<number> {
    this.weeklyGoalSubject.next(goal);
    this.saveWeeklyGoal();
    return of(goal);
  }

  /**
   * Get weekly workout goal
   */
  getWeeklyGoal(): Observable<number> {
    return of(this.weeklyGoalSubject.value);
  }

  /**
   * Convert Date to string format (YYYY-MM-DD)
   */
  private dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get chart data for calories burned
   */
  getCaloriesChartData(userId: string): Observable<any> {
    const userProgress = this.mockProgress.filter(p => p.userId === userId);
    return of({
      labels: userProgress.map(p => p.workoutTitle),
      data: userProgress.map(p => p.caloriesBurned || 0)
    });
  }

  /**
   * Get workout type distribution for pie chart
   */
  getWorkoutDistribution(userId: string): Observable<any> {
    const userProgress = this.mockProgress.filter(p => p.userId === userId);
    const distribution: { [key: string]: number } = {};

    userProgress.forEach(log => {
      distribution[log.workoutTitle] = (distribution[log.workoutTitle] || 0) + 1;
    });

    return of({
      labels: Object.keys(distribution),
      data: Object.values(distribution)
    });
  }
}

