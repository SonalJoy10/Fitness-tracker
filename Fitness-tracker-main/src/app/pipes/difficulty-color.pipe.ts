import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyColor',
  standalone: true
})
export class DifficultyColorPipe implements PipeTransform {
  transform(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner':
        return '#e8f5e9'; // Light green
      case 'Intermediate':
        return '#fff3e0'; // Light orange
      case 'Advanced':
        return '#ffebee'; // Light red
      default:
        return '#f5f5f5'; // Light gray
    }
  }
}
