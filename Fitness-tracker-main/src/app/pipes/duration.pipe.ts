import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workoutDuration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  /**
   * Convert minutes to "X hr Y min" format
   * @param minutes - Duration in minutes
   * @returns Formatted duration string
   */
  transform(minutes: number | null | undefined): string {
    if (!minutes || minutes <= 0) {
      return '0 min';
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${mins} min`;
    }
  }
}
