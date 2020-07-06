import { Injectable } from '@angular/core';

import {
  HttpClient, HttpHeaders, HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {
  S2Point, PointAllExpression, EdgeNew,
} from './entity/s2';

const AdminTokenHeaderName = 'X-S2-Demo-Token';

function u(origin: string, path: string): string {
  return `${origin}${path}`;
}

class OptBuilder {
  private o: any;
  constructor() {
    this.o = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
      withCredentials: false, // Must be false for Google Cloud Storage
    };
  }
  public header(k: string, v: string): OptBuilder {
    this.o.headers = this.o.headers.set(k, v);
    return this;
  }
  public param(k: string, v: string): OptBuilder {
    this.o.params = this.o.params.set(k, v);
    return this;
  }
  public jsonResponseBody(): OptBuilder {
    this.o.responseType = 'json';
    return this;
  }
  public textResponseBody(): OptBuilder {
    this.o.responseType = 'text';
    return this;
  }
  public fullResponse(): OptBuilder {
    this.o.observe = 'response';
    return this;
  }
  public gen(): any {
    return this.o;
  }
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  async getFnPointFromLatLng(
    lat: number,
    lng: number,
  ): Promise<PointAllExpression> {
    return this.http.get(
      u(environment.api, `/fn/point/all_expression?lat=${lat}&lng=${lng}`),
      new OptBuilder()
        .header(AdminTokenHeaderName, environment.adminToken)
        .jsonResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v);
  }

  async getEdgeNew(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): Promise<EdgeNew> {
    return this.http.get(
      u(environment.api, `/edge/new?lat1=${lat1}&lng1=${lng1}&lat2=${lat2}&lng2=${lng2}`),
      new OptBuilder()
        .header(AdminTokenHeaderName, environment.adminToken)
        .jsonResponseBody()
        .gen(),
    ).toPromise().then((v: any) => v);
  }

}
