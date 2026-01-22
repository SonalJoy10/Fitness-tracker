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
import { ProgressService } from '../../services/progress.service';
import { UserService } from '../../services/user.service';
import { ProgressLog } from '../../models/progress.model';

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
    MatProgressBarModule
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
  }

  loadProgress(): void {
    this.isLoading = true;
    this.progressService.getProgressByUserId(this.currentUserId).subscribe({
      next: (logs) => {
        this.logs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.isLoading = false;
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
    this.logs = this.logs.filter(log => log.id !== id);
    this.loadStatistics();
  }

  getCompletionRate(): number {
    if (this.logs.length === 0) return 0;
    const completed = this.logs.filter(
      log => log.exercises.some(ex => ex.completed)
    ).length;
    return Math.round((completed / this.logs.length) * 100);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

