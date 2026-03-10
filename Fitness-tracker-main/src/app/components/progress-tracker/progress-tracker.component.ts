import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressService } from '../../services/progress.service';
import { UserService } from '../../services/user.service';
import { ProgressLog } from '../../models/progress.model';
import { ChartVisualizationComponent } from '../chart-visualization/chart-visualization.component';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ChartVisualizationComponent,
    DurationPipe
  ],
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  logs: ProgressLog[] = [];
  selectedTabIndex = 0;
  isLoading = false;
  currentUserId = 'user1';
  statistics: any = {};
  displayedColumns: string[] = ['date', 'workoutTitle', 'duration', 'calories', 'exercises', 'actions'];

  // Weekly goal properties
  weeklyGoal: number = 5;
  weeklyCompleted: number = 0;
  weeklyProgress: number = 0;

  // Chart properties
  calorieChartLabels: string[] = [];
  calorieChartData: number[] = [];
  workoutDistributionLabels: string[] = [];
  workoutDistributionData: number[] = [];

  progressForm: FormGroup;

  constructor(
    private progressService: ProgressService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.progressForm = this.fb.group({
      workoutTitle: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      caloriesBurned: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadProgress();
    this.loadStatistics();
    this.loadWeeklyGoal();
    this.loadChartData();
  }

  loadProgress(): void {
    this.isLoading = true;
    this.progressService.getProgressByUserId(this.currentUserId).subscribe({
      next: (logs) => {
        this.logs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.isLoading = false;
        this.updateWeeklyProgress();
        this.loadChartData();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadStatistics(): void {
    this.progressService.getStatistics(this.currentUserId).subscribe({
      next: (stats) => {
        this.statistics = stats;
      }
    });
  }

  /**
   * Load weekly goal from service
   */
  loadWeeklyGoal(): void {
    this.progressService.getWeeklyGoal().subscribe({
      next: (goal) => {
        this.weeklyGoal = goal;
        this.updateWeeklyProgress();
      }
    });
  }

  /**
   * Update weekly workout progress
   */
  private updateWeeklyProgress(): void {
    this.progressService.getWeeklyWorkouts(this.currentUserId).subscribe({
      next: (count) => {
        this.weeklyCompleted = count;
        this.weeklyProgress = Math.round((this.weeklyCompleted / this.weeklyGoal) * 100);
      }
    });
  }

  /**
   * Set new weekly goal
   */
  setWeeklyGoal(newGoal: number): void {
    this.progressService.setWeeklyGoal(newGoal).subscribe({
      next: () => {
        this.loadWeeklyGoal();
      }
    });
  }

  /**
   * Load chart data
   */
  private loadChartData(): void {
    // Load calories chart data
    this.progressService.getCaloriesChartData(this.currentUserId).subscribe({
      next: (chartData) => {
        this.calorieChartLabels = chartData.labels;
        this.calorieChartData = chartData.data;
      }
    });

    // Load workout distribution data
    this.progressService.getWorkoutDistribution(this.currentUserId).subscribe({
      next: (distData) => {
        this.workoutDistributionLabels = distData.labels;
        this.workoutDistributionData = distData.data;
      }
    });
  }

  addProgress(): void {
    if (this.progressForm.valid) {
      const newLog: ProgressLog = {
        id: Date.now().toString(),
        userId: this.currentUserId,
        workoutId: '',
        workoutTitle: this.progressForm.get('workoutTitle')?.value,
        date: new Date(this.progressForm.get('date')?.value).toISOString().split('T')[0],
        duration: this.progressForm.get('duration')?.value,
        caloriesBurned: this.progressForm.get('caloriesBurned')?.value || 0,
        exercises: [],
        notes: this.progressForm.get('notes')?.value
      };

      this.progressService.addProgressLog(newLog).subscribe({
        next: () => {
          this.loadProgress();
          this.loadStatistics();
          this.progressForm.reset();
          this.selectedTabIndex = 0;
        }
      });
    }
  }

  deleteProgress(id: string): void {
    this.progressService.deleteProgressLog(id).subscribe({
      next: () => {
        this.loadProgress();
        this.loadStatistics();
      }
    });  }

  /**
   * Get completion rate percentage
   */
  getCompletionRate(): number {
    if (!this.logs || this.logs.length === 0) return 0;
    const completed = this.logs.filter(log => log.date).length;
    return Math.round((completed / this.logs.length) * 100);
  }

  /**
   * Format date to readable format
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}