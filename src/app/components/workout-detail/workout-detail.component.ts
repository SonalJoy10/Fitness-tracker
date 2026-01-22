import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutPlan } from '../../models/workout.model';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {
  workout: WorkoutPlan | null = null;
  isLoading = false;
  selectedTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.loadWorkout();
  }

  loadWorkout(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.workoutService.getWorkoutById(id).subscribe({
        next: (workout) => {
          this.workout = workout || null;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  startWorkout(): void {
    // Navigate to progress tracker with workout data
    console.log('Starting workout:', this.workout?.title);
  }

  openVideo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getTotalDuration(): number {
    return this.workout?.exercises.reduce((sum, ex) => sum + (ex.duration || 0), 0) || 0;
  }

  getTotalExercises(): number {
    return this.workout?.exercises.length || 0;
  }

  goBack(): void {
    window.history.back();
  }
}
