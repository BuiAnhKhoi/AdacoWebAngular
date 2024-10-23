import { TestBed } from '@angular/core/testing';

import { HashPasswordService } from './hash-password.service';

describe('HashPasswordService', () => {
  let service: HashPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
