import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-region-rect',
  templateUrl: './region-rect.component.html',
  styleUrls: ['./region-rect.component.scss']
})
export class RegionRectComponent implements OnInit {

  public codeEdgeDefinition = `
  type Edge struct {
    V0, V1 Point
  }
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
