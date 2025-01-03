import { Injectable } from '@angular/core';
import { Goal } from '@app/core/model/goal.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalTrackerService {
  private goals: Goal[] = [];

  constructor() { }

  allGoals () {
    return of(this.goals);
  }
}
