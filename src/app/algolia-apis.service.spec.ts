import { TestBed } from '@angular/core/testing';

import { AlgoliaAPIsService } from './algolia-apis.service';

describe('AlgoliaAPIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgoliaAPIsService = TestBed.get(AlgoliaAPIsService);
    expect(service).toBeTruthy();
  });
});
