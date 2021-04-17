import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AboutComponent } from 'src/app/component/about/about.component';

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
export class TopComponent implements OnInit, AfterViewInit {

  public opened: boolean;
  public toc: Array<TableOfContent>;

  @ViewChild('scroller')
  private elScroller: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.opened = true;
    this.toc = [
      {
        name: '概要',
        url: '',
        children: [
          { name: 's2とは何か？', },
          { name: 's2はデータベースではない', },
          { name: 'Cellとは何か？', },
          { name: 's2の利用実績', },
          { name: 's2がサポートする言語', },
        ],
      },
      {
        name: '緯度経度',
        url: 'latlng',
        children: [],
      },
      {
        name: '距離',
        url: 'distance',
        children: [
          { name: 's1.Angle', },
        ],
      },
      {
        name: '領域',
        url: 'region',
        children: [
          { name: 's2.Cap', },
          { name: 's2.Loop', },
        ],
      },
      {
        name: 'Cell',
        url: 'cell',
        children: [
        ],
      },
      {
        name: 'UnionCell',
        url: 'cell_union',
        children: [
        ],
      },
    ];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  clickAbout(): void {
    this.dialog.open(AboutComponent);
  }
}
