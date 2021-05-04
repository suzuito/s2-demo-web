import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface SchemaImageObject {
  url: string;
  width: number;
  height: number;
  '@type': 'ImageObject';
}

function toDateString(at: number): string {
  const a = new Date(at * 1000);
  let r = '';
  r += `${a.getFullYear()}`;
  r += '-';
  if (a.getMonth() < 10) {
    r += `0${a.getMonth()}`;
  } else {
    r += `${a.getMonth()}`;
  }
  r += '-';
  if (a.getDate() < 10) {
    r += `0${a.getDate()}`;
  } else {
    r += `${a.getDate()}`;
  }
  return r;
}

export class LdJSONGenerator {
  private data: Array<object>;
  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.data = [];
  }

  addWebPage(
    url: string,
    name: string,
    headline: string,
    description: string,
  ): LdJSONGenerator {
    this.data.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      mainEntityOfPage: url,
      headline,
      description,
    });
    return this;
  }

  generate(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`<script type="application/ld+json">${JSON.stringify(this.data)}</script>`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LdJsonService {

  constructor(
    private sanitizer: DomSanitizer,
  ) {
  }

  generator(): LdJSONGenerator {
    return new LdJSONGenerator(this.sanitizer);
  }
}