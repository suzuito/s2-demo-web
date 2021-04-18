import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubSourceCodeComponent } from './github-source-code.component';

describe('GithubSourceCodeComponent', () => {
  let component: GithubSourceCodeComponent;
  let fixture: ComponentFixture<GithubSourceCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubSourceCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSourceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
