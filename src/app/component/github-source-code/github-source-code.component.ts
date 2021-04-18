import { Component, Input, OnInit } from '@angular/core';
import { GitService } from 'src/app/git.service';

@Component({
  selector: 'app-github-source-code',
  templateUrl: './github-source-code.component.html',
  styleUrls: ['./github-source-code.component.scss']
})
export class GithubSourceCodeComponent implements OnInit {

  @Input()
  public path: string;

  @Input()
  public lang: string;

  public content: string;

  constructor(
    private gitService: GitService,
  ) {
    this.path = '';
    this.content = '';
    this.lang = '';
  }

  ngOnInit(): void {
    this.gitService.getSourceCode(this.path).then(v => this.content = v);
  }
}
