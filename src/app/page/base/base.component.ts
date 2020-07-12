import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

declare let gtag: any;

export class BaseComponent {

  public fragment: string;

  private gaid: string;

  constructor(
    route: ActivatedRoute,
    router: Router,
  ) {
    this.gaid = 'G-79P9XTW1Y6';
    this.fragment = '';
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (gtag) {
          gtag('config', this.gaid, {
            page_path: e.urlAfterRedirects,
          });
        }
      }
    });
    route.fragment.subscribe(f => {
      this.fragment = f;
      if (!this.fragment) {
        return;
      }
      const e = document.getElementById(`${this.fragment}`);
      if (!e) {
        return;
      }
      e.scrollIntoView();
    });
  }

  OnInit(): void {
  }

  AfterViewInit(): void {
    if (!this.fragment) {
      return;
    }
    document.getElementById(`${this.fragment}`).scrollIntoView();
  }

}
