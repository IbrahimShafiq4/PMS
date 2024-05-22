import { TestBed } from '@angular/core/testing';

import { ProjectsBoardService } from './projects-board.service';

describe('ProjectsBoardService', () => {
  let service: ProjectsBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
