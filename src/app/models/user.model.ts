export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  height?: number; // in cm
  weight: number; // in kg
  goal: string;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  profileImage?: string;
  joinDate?: string;
}
