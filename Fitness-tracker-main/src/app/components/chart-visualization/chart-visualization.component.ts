import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

/**
 * Simple bar chart component using Canvas API
 * For production, integrate with ng2-charts or chart.js library
 */
@Component({
  selector: 'app-chart-visualization',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="chart-card">
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="chart-container">
          <canvas #chartCanvas></canvas>
        </div>
        <div class="chart-stats" *ngIf="stats">
          <div class="stat-row">
            <span class="stat-label">Total:</span>
            <span class="stat-value">{{ stats.total }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Average:</span>
            <span class="stat-value">{{ stats.average }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Maximum:</span>
            <span class="stat-value">{{ stats.max }}</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .chart-card {
      margin-bottom: 24px;
    }

    .chart-container {
      position: relative;
      height: 400px;
      margin-bottom: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      padding: 16px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }

    .chart-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 12px;
      padding-top: 12px;
      border-top: 1px solid #eee;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }

    .stat-label {
      color: #999;
      text-transform: uppercase;
      font-weight: 600;
    }

    .stat-value {
      color: #1976d2;
      font-weight: 600;
    }
  `]
})
export class ChartVisualizationComponent implements OnInit {
  @Input() title: string = 'Chart';
  @Input() chartType: 'bar' | 'doughnut' | 'line' = 'bar';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  stats: any;

  ngOnInit(): void {
    this.calculateStats();
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private calculateStats(): void {
    if (this.data.length === 0) {
      this.stats = null;
      return;
    }

    const total = this.data.reduce((a, b) => a + b, 0);
    const average = Math.round(total / this.data.length);
    const max = Math.max(...this.data);

    this.stats = {
      total: total.toFixed(0),
      average: average.toFixed(0),
      max: max.toFixed(0)
    };
  }

  private drawChart(): void {
    if (!this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    switch (this.chartType) {
      case 'bar':
        this.drawBarChart(ctx, canvas);
        break;
      case 'doughnut':
        this.drawDoughnutChart(ctx, canvas);
        break;
      case 'line':
        this.drawLineChart(ctx, canvas);
        break;
    }
  }

  private drawBarChart(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const barWidth = chartWidth / this.data.length * 0.7;
    const barSpacing = chartWidth / this.data.length;
    const maxValue = Math.max(...this.data, 1);

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw bars
    ctx.fillStyle = '#1976d2';
    this.data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + (index * barSpacing) + (barSpacing - barWidth) / 2;
      const y = height - padding - barHeight;

      ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    this.labels.forEach((label, index) => {
      const x = padding + (index * barSpacing) + barSpacing / 2;
      const y = height - padding + 20;
      ctx.fillText(label.substring(0, 10), x, y);
    });
  }

  private drawDoughnutChart(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    const innerRadius = radius * 0.6;

    const total = this.data.reduce((a, b) => a + b, 0);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    let currentAngle = -Math.PI / 2;

    this.data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      const color = colors[index % colors.length];

      // Draw slice
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.lineTo(centerX + innerRadius * Math.cos(currentAngle + sliceAngle), 
                 centerY + innerRadius * Math.sin(currentAngle + sliceAngle));
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fill();

      currentAngle += sliceAngle;
    });

    // Draw legend
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    this.labels.forEach((label, index) => {
      const color = colors[index % colors.length];
      const y = 20 + index * 20;

      ctx.fillStyle = color;
      ctx.fillRect(10, y - 8, 12, 12);

      ctx.fillStyle = '#666';
      ctx.fillText(label, 30, y);
    });
  }

  private drawLineChart(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const maxValue = Math.max(...this.data, 1);
    const pointSpacing = chartWidth / (this.data.length - 1 || 1);

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw line
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.data.forEach((value, index) => {
      const x = padding + index * pointSpacing;
      const y = height - padding - (value / maxValue) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#4caf50';
    this.data.forEach((value, index) => {
      const x = padding + index * pointSpacing;
      const y = height - padding - (value / maxValue) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}
