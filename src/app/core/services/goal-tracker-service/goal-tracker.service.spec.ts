import { TestBed } from '@angular/core/testing';

import { GoalTrackerService } from './goal-tracker.service';

describe('GoalTrackerService', () => {
  let service: GoalTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
