import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleMapScriptLoaderService } from 'src/app/google-map-script-loader.service';

@Injectable({
  providedIn: 'root'
})
export class TopGuard implements CanActivate {
  constructor(
    private ggml: GoogleMapScriptLoaderService,
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    let returned = false;
    try {
      await this.ggml.init();
      returned = true;
    } catch {
      returned = false;
    }
    return returned;
  }

}
