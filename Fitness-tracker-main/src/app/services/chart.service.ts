import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service for managing chart data and configurations
 */
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {}

  /**
   * Get bar chart configuration for calories burned
   */
  getCaloriesChartConfig(labels: string[], data: number[]): any {
    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Calories Burned',
            data: data,
            backgroundColor: '#1976d2',
            borderColor: '#1565c0',
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Calories Burned Per Workout'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Calories (kcal)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Workout'
            }
          }
        }
      }
    };
  }

  /**
   * Get pie chart configuration for workout distribution
   */
  getWorkoutDistributionConfig(labels: string[], data: number[]): any {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#C9CBCF'
    ];

    return {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Workout Count',
            data: data,
            backgroundColor: colors.slice(0, labels.length),
            borderColor: '#ffffff',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Workout Type Distribution'
          }
        }
      }
    };
  }

  /**
   * Get line chart configuration for progress over time
   */
  getProgressChartConfig(labels: string[], durations: number[], calories: number[]): any {
    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Workout Duration (min)',
            data: durations,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#4caf50'
          },
          {
            label: 'Calories Burned',
            data: calories,
            borderColor: '#ff9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#ff9800'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Workout Progress Over Time'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    };
  }
}
