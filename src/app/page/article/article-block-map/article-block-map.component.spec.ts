import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBlockMapComponent } from './article-block-map.component';

describe('ArticleBlockMapComponent', () => {
  let component: ArticleBlockMapComponent;
  let fixture: ComponentFixture<ArticleBlockMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleBlockMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBlockMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
