import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  isEditing = false;
  selectedTabIndex = 0;
  bmi: number | null = null;
  recommendations: string[] = [];

  profileForm: FormGroup;

  fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
  goals = ['Build Muscle', 'Lose Weight', 'Improve Endurance', 'Increase Flexibility', 'General Fitness'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [''],
      height: ['', Validators.min(0)],
      weight: ['', [Validators.required, Validators.min(0)]],
      goal: ['', Validators.required],
      fitnessLevel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.profileForm.patchValue(user);
          this.calculateBMI();
          this.loadRecommendations();
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  calculateBMI(): void {
    if (this.user?.id) {
      this.userService.calculateBMI(this.user.id).subscribe({
        next: (bmi) => {
          this.bmi = bmi;
        }
      });
    }
  }

  loadRecommendations(): void {
    if (this.user?.id) {
      this.userService.getFitnessRecommendations(this.user.id).subscribe({
        next: (recommendations) => {
          this.recommendations = recommendations;
        }
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.user?.id) {
      const updatedUser = this.profileForm.value;
      this.userService.updateUserProfile(this.user.id, updatedUser).subscribe({
        next: () => {
          this.loadUserProfile();
          this.isEditing = false;
        }
      });
    }
  }

  cancelEdit(): void {
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
    this.isEditing = false;
  }

  getBMICategory(bmi: number | null): string {
    if (!bmi) return 'N/A';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal Weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  getBMIColor(bmi: number | null): string {
    if (!bmi) return '';
    if (bmi < 18.5) return 'warn';
    if (bmi < 25) return 'primary';
    if (bmi < 30) return 'accent';
    return 'warn';
  }

  updateWeight(): void {
    const newWeight = this.profileForm.get('weight')?.value;
    if (this.user?.id && newWeight) {
      this.userService.updateWeight(this.user.id, newWeight).subscribe({
        next: () => {
          this.loadUserProfile();
        }
      });
    }
  }
}
