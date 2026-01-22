import { Routes } from '@angular/router';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WorkoutListComponent,
    data: { title: 'Home' }
  },
  {
    path: 'workouts',
    component: WorkoutListComponent,
    data: { title: 'Workouts' }
  },
  {
    path: 'workouts/:id',
    component: WorkoutDetailComponent,
    data: { title: 'Workout Details' }
  },
  {
    path: 'progress',
    component: ProgressTrackerComponent,
    data: { title: 'Progress' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile' }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
