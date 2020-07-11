import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appHeadRef]'
})
export class HeadRefDirective {

  private e: HTMLElement;

  constructor(
    el: ElementRef,
    private router: Router,
  ) {
    this.e = el.nativeElement as HTMLElement;

    this.e.style.cursor = 'pointer';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.e.style.textDecoration = 'underline';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.e.style.textDecoration = '';
  }

  @HostListener('click') onClick(): void {
    this.router.navigate(['.'], { fragment: this.e.id });
  }

}
