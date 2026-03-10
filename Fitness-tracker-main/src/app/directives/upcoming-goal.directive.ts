import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appUpcomingGoal]',
  standalone: true
})
export class UpcomingGoalDirective implements OnInit {
  @Input() set appUpcomingGoal(isUpcoming: boolean) {
    if (isUpcoming) {
      this.el.nativeElement.style.borderRadius = '8px';
      this.el.nativeElement.style.border = '2px solid #ffc107';
      this.el.nativeElement.style.backgroundColor = '#fffde7';
      this.el.nativeElement.style.padding = '8px';
    } else {
      this.el.nativeElement.style.border = 'none';
      this.el.nativeElement.style.backgroundColor = 'transparent';
      this.el.nativeElement.style.padding = '0';
    }
  }

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }
}
