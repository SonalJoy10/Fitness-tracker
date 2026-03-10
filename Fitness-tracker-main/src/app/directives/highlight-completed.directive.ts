import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightCompleted]',
  standalone: true
})
export class HighlightCompletedDirective implements OnInit {
  @Input() set appHighlightCompleted(isCompleted: boolean) {
    if (isCompleted) {
      this.el.nativeElement.style.backgroundColor = '#c8e6c9';
      this.el.nativeElement.style.borderLeft = '4px solid #4caf50';
      this.el.nativeElement.style.paddingLeft = '12px';
    } else {
      this.el.nativeElement.style.backgroundColor = 'transparent';
      this.el.nativeElement.style.borderLeft = 'none';
      this.el.nativeElement.style.paddingLeft = '16px';
    }
  }

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }
}
