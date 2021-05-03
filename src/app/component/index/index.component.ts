import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleListItem } from 'src/app/entity/article_list';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @Input()
  public root: ArticleListItem | undefined;

  @Input()
  public depth: number;

  @Input()
  public paddingLeft: string;

  @Output()
  public clickLink: EventEmitter<ArticleListItem>;

  constructor() {
    this.depth = 0;
    this.paddingLeft = '6px';
    this.clickLink = new EventEmitter<ArticleListItem>();
  }

  ngOnInit(): void {
  }

  get paddingTop(): string {
    if (this.depth === 1) {
      return '6px';
    }
    return '0px';
  }

  get title(): string {
    if (this.root === undefined) {
      return '';
    }
    let title = '';
    if (this.root.anchor) {
      title = `#${this.root.anchor}`;
    } else {
      title = this.root.name;
    }
    return title;
  }
}
