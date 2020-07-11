import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(
    private route: ActivatedRoute,
  ) {
    super(route);
  }

  ngOnInit(): void {
    super.OnInit();
  }

  ngAfterViewInit(): void {
    super.AfterViewInit();
  }

}
