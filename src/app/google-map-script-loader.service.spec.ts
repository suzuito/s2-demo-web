import { TestBed } from '@angular/core/testing';

import { GoogleMapScriptLoaderService } from './google-map-script-loader.service';

describe('GoogleMapScriptLoaderService', () => {
  let service: GoogleMapScriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapScriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
