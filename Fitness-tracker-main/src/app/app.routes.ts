import { Routes } from '@angular/router';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
    data: { title: 'Progress' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { title: 'Profile' },
    children: [
      {
        path: 'info',
        component: ProfileComponent,
        data: { title: 'Profile Info' }
      },
      {
        path: 'settings',
        component: ProfileComponent,
        data: { title: 'Profile Settings' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
