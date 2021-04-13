import { TestBed } from '@angular/core/testing';

import { DataPhotoService } from './data-photo.service';

describe('DataPhotoService', () => {
  let service: DataPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
