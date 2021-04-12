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
          { name: 's2で何ができるのか？', },
        ],
      },
      {
        name: '座標系',
        url: 'point',
        children: [
          { name: 's1.Angle', },
          { name: 's2.LatLng', },
          { name: 's2.Point', },
        ],
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

  clickAbout(): void {
    this.dialog.open(AboutComponent);
  }
}
