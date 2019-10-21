import { TestBed } from '@angular/core/testing';

import { WeProxyService } from './we-proxy.service';

describe('WeProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeProxyService = TestBed.get(WeProxyService);
    expect(service).toBeTruthy();
  });
});
