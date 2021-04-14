import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input()
  public href: string;

  constructor() {
    this.href = '';
  }

  ngOnInit(): void {
  }

  clickLink(): void {
    window.open(this.href);
  }

}
