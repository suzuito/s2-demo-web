import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AboutComponent } from 'src/app/component/about/about.component';

interface TableOfContent {
  name: string;
  disabled?: boolean | undefined;
  url?: string | undefined;
  fragment?: boolean | undefined;
  children?: Array<TableOfContent> | undefined;
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
          { fragment: true, name: 's2とは何か？', },
          { fragment: true, name: 's2はデータベースではない', },
          { fragment: true, name: 'Cellとは何か？', },
          { fragment: true, name: 's2の利用実績', },
          { fragment: true, name: 's2がサポートする言語', },
        ],
      },
      {
        name: '緯度経度',
        url: 'latlng',
        children: [],
      },
      {
        name: '幾何学計算',
        url: 'geometry',
        children: [
          {
            url: 'point',
            name: 's2.Point',
          },
          {
            url: 'ccw',
            name: '点列の回転方向（時計回り 反時計回り）',
          },
          {
            url: 'points',
            name: '2点間の距離（工事中）',
          },
          {
            url: 'loop',
            name: 's2.Loop（工事中）',
          }
        ],
      },
      {
        name: '距離（工事中）',
        url: 'distance',
      },
      {
        name: 'Cell（工事中）',
        url: 'cell',
        children: [
        ],
      },
      {
        name: 'UnionCell（工事中）',
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

  clickLink(v: TableOfContent): void {
    if (v.disabled === true) {
      return;
    }
    this.router.navigate([
      v.url !== undefined ? v.url : '',
    ], {
      fragment: v.fragment === true ? v.name : undefined,
    });
  }

  getLinkName(v: TableOfContent): string {
    if (v.fragment) {
      return `#${v.name}`;
    }
    return v.name;
  }
}
