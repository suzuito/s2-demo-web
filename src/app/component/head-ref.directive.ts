import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Directive({
  selector: '[appHeadRef]'
})
export class HeadRefDirective {

  private e: HTMLElement;

  constructor(
    el: ElementRef,
    private locationService: Location,
    private router: Router,
  ) {
    this.e = el.nativeElement as HTMLElement;
    this.e.style.cursor = 'pointer';
    this.e.style.fontWeight = 'bold';
    this.e.innerText = this.e.id;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.e.style.textDecoration = 'underline';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.e.style.textDecoration = '';
  }

  @HostListener('click') onClick(): void {
    this.router.navigate([this.locationService.path()], { fragment: this.e.id });
  }

}
