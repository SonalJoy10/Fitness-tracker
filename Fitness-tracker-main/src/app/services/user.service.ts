import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private mockUsers: User[] = [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      age: 28,
      height: 180,
      weight: 85,
      goal: 'Build Muscle',
      fitnessLevel: 'Intermediate',
      profileImage: 'assets/images/avatars/john.svg',
      joinDate: '2024-01-15'
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 26,
      height: 165,
      weight: 65,
      goal: 'Lose Weight',
      fitnessLevel: 'Beginner',
      profileImage: 'assets/images/avatars/jane.svg',
      joinDate: '2024-06-10'
    }
  ];

  private currentUserId = 'user1'; // Default user

  constructor() {
    this.setCurrentUser(this.currentUserId);
  }

  // Get current user
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  // Set current user
  setCurrentUser(userId: string): Observable<User | undefined> {
    const user = this.mockUsers.find(u => u.id === userId);
    this.userSubject.next(user || null);
    return of(user);
  }

  // Get user by ID
  getUserById(userId: string): Observable<User | undefined> {
    return of(this.mockUsers.find(u => u.id === userId));
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  // Update user profile
  updateUserProfile(userId: string, updatedUser: Partial<User>): Observable<User | undefined> {
    const index = this.mockUsers.findIndex(u => u.id === userId);
    if (index > -1) {
      this.mockUsers[index] = { ...this.mockUsers[index], ...updatedUser };
      if (userId === this.currentUserId) {
        this.userSubject.next(this.mockUsers[index]);
      }
      return of(this.mockUsers[index]);
    }
    return of(undefined);
  }

  // Update weight tracking
  updateWeight(userId: string, newWeight: number): Observable<User | undefined> {
    return this.updateUserProfile(userId, { weight: newWeight });
  }

  // Add new user
  addUser(user: User): Observable<User> {
    this.mockUsers.push(user);
    return of(user);
  }

  // Get BMI for user
  calculateBMI(userId: string): Observable<number | null> {
    const user = this.mockUsers.find(u => u.id === userId);
    if (user && user.height && user.weight) {
      const heightInMeters = user.height / 100;
      const bmi = user.weight / (heightInMeters * heightInMeters);
      return of(Math.round(bmi * 10) / 10);
    }
    return of(null);
  }

  // Get fitness recommendations based on level
  getFitnessRecommendations(userId: string): Observable<string[]> {
    const user = this.mockUsers.find(u => u.id === userId);
    const recommendations: string[] = [];

    if (user) {
      if (user.fitnessLevel === 'Beginner') {
        recommendations.push('Start with 3 days a week workout schedule');
        recommendations.push('Focus on form and proper technique');
        recommendations.push('Include warm-up and cool-down');
      } else if (user.fitnessLevel === 'Intermediate') {
        recommendations.push('Aim for 4-5 days a week');
        recommendations.push('Incorporate progressive overload');
        recommendations.push('Add variety to your routine');
      } else {
        recommendations.push('Train 5-6 days a week');
        recommendations.push('Focus on periodization and peak performance');
        recommendations.push('Track detailed metrics and progress');
      }

      if (user.goal === 'Build Muscle') {
        recommendations.push('Increase protein intake to 1.6-2.2g per kg');
        recommendations.push('Focus on compound exercises');
      } else if (user.goal === 'Lose Weight') {
        recommendations.push('Create a caloric deficit');
        recommendations.push('Include both cardio and strength training');
      }
    }

    return of(recommendations);
  }
}
