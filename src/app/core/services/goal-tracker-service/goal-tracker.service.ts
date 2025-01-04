import { Injectable, signal } from '@angular/core';
import { Goal } from '@app/core/model/goal.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalTrackerService {
  private goals: Goal[] = [];
  selectedGoal = signal<{id: string, title: string} | null>(null); 
  goalId = signal<string | null>(null);

  constructor() { }

  allGoals () {
    return of(this.goals);
  }

  createGoal(goal:Goal) {
    this.goals = [goal, ...this.goals];
    console.log('logging goals after adding a new goal: ', this.goals);
  }
}
