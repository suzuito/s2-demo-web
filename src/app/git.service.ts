import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  OptBuilder,
} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(
    private http: HttpClient,
  ) { }

  async getSourceCode(p: string): Promise<string> {
    return this.http.get(
      `https://raw.githubusercontent.com/${p}`,
      new OptBuilder()
        .textResponseBody()
        .gen()
    ).toPromise().then((v: any) => {
      return v;
    });
  }
}
