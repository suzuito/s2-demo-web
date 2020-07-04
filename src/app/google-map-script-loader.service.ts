import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapScriptLoaderService {

  public loaded: boolean;

  constructor() {
    this.loaded = false;
  }

  async init(): Promise<void> {
    const id = 's2-demo-google-maps-loader';
    return new Promise<void>((resolve, reject) => {
      if (!document.getElementById(id)) {
        // Create the script tag, set the appropriate attributes
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapAPIKey}&callback=initMap`;
        script.defer = true;
        script.async = true;
        script.id = id;
        // Attach your callback function to the `window` object
        globalThis.initMap = () => {
          console.log('JS API is loaded and available');
          this.loaded = true;
          resolve();
        };
        // Append the 'script' element to 'head'
        document.head.appendChild(script);
        return;
      }
      resolve();
    });
  }
}
