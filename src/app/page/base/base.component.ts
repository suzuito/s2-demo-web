import { OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class BaseComponent {

  public fragment: string;

  constructor(
    private route1: ActivatedRoute,
  ) {
    this.fragment = '';
  }

  OnInit(): void {
    this.route1.fragment.subscribe(f => {
      this.fragment = f;
      if (!this.fragment) {
        return;
      }
      document.getElementById(`${this.fragment}`).scrollIntoView();
    });
  }

  AfterViewInit(): void {
    if (!this.fragment) {
      return;
    }
    document.getElementById(`${this.fragment}`).scrollIntoView();
  }

}
