import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AboutComponent } from 'src/app/component/about/about.component';
import { ArticleListItem } from 'src/app/entity/article_list';
import { TopService } from './top.service';

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

  @ViewChild('scroller')
  private elScroller: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private topService: TopService,
  ) {
    this.opened = true;
  }

  get rootIndex(): ArticleListItem | undefined {
    return this.topService.index;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  clickIndex(v: ArticleListItem): void {
    this.router.navigate([
      'article', v.articleId,
    ], {
      fragment: v.anchor !== '' ? v.anchor : undefined,
    });
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
