import { TestBed } from '@angular/core/testing';

import { KdbxwebService } from './kdbxweb.service';

describe('KdbxwebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KdbxwebService = TestBed.get(KdbxwebService);
    expect(service).toBeTruthy();
  });
});
