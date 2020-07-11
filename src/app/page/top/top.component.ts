import { Component, OnInit } from '@angular/core';

interface TableOfContent {
  name: string;
  url?: string;
  children?: Array<TableOfContent>;
}


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  public opened: boolean;
  public toc: Array<TableOfContent>;

  constructor() {
    this.opened = true;
    this.toc = [
      {
        name: '概要',
        url: '',
        children: [
          {
            name: 's2とは何か？',
          },
          {
            name: 's2で何ができるのか？',
          },
        ],
      },
      {
        name: '座標系',
        url: 'point',
        children: [
          {
            name: '一般的なLatLng',
          },
          {
            name: 's2.LatLng',
          },
          {
            name: 's2.Point',
          },
        ],
      },
      {
        name: '距離',
        url: 'point',
        children: [
          {
            name: 's2.Angle',
          },
          {
            name: 's2.ChordAngle',
          },
        ],
      },
      {
        name: '領域',
        url: 'point',
        children: [
          {
            name: 's2.Cap',
          },
          {
            name: 's2.Loop',
          },
        ],
      },
      {
        name: 'Cell',
        url: 'point',
        children: [
          {
            name: 's2.Cell',
          },
          {
            name: 's2.UnionCell',
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
  }

  toggleTOC(): void {
    if (this.opened) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  get stringIsOpened(): string {
    if (this.opened) {
      return 'を閉じる';
    }
    return '';
  }

}
