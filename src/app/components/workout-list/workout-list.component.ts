import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutPlan } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: WorkoutPlan[] = [];
  filteredWorkouts: WorkoutPlan[] = [];
  selectedDifficulty = '';
  searchQuery = '';
  isLoading = false;

  difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.isLoading = true;
    this.workoutService.getWorkouts().subscribe({
      next: (workouts) => {
        this.workouts = workouts;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredWorkouts = this.workouts.filter(workout => {
      const matchesDifficulty =
        !this.selectedDifficulty || workout.difficulty === this.selectedDifficulty;
      const matchesSearch =
        !this.searchQuery ||
        workout.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        workout.targetMuscles.some(muscle =>
          muscle.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      return matchesDifficulty && matchesSearch;
    });
  }

  onDifficultyChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner':
        return 'primary';
      case 'Intermediate':
        return 'accent';
      case 'Advanced':
        return 'warn';
      default:
        return 'primary';
    }
  }

  getExerciseCount(workout: WorkoutPlan): number {
    return workout.exercises.length;
  }

  getTotalDuration(workout: WorkoutPlan): number {
    return workout.exercises.reduce((sum, ex) => sum + (ex.duration || 0), 0);
  }
}

