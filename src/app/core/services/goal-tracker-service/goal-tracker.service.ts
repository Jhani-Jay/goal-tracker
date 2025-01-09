import { Injectable, signal } from '@angular/core';
import { Goal } from '@app/core/model/goal.model';
import { map, Observable, of, take } from 'rxjs';
import { Task } from '@app/core/model/goal.model';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/model/AppState.model';
import { goal } from '@app/core/state/goal.selector';

@Injectable({
  providedIn: 'root',
})
export class GoalTrackerService {
  private goals: Goal[] = [];
  selectedGoal = signal<{ id: string; title: string } | null>(null);
  goalId = signal<string | null>(null);
  selectedSubtask = signal<Task | null>(null);
  subtaskId = signal<string | null>(null);

  constructor(private store: Store<AppState>) {}

  allGoals() {
    return of(this.goals);
  }

  createGoal(goal: Goal) {
    this.goals = [goal, ...this.goals];
    console.log('logging goals after adding a new goal: ', this.goals);
  };

  selectSubtaskData(): Observable<string[] | null> {
    const id = this.goalId();
    if (!id) return of(null);
  
    return this.store.select(goal(id)).pipe(
      map(data => {
        const comments = data?.milestones.flatMap(milestone =>
          milestone.tasks.flatMap(task => {
            if (task.name === this.subtaskId()) {
              return task.comments
            } else {
              return '';
            }
          })
        );
        
        return comments && comments.length > 0
          ? comments.filter(comment => comment !== undefined && comment !== ''
          )
          : null;
      })
    );
  };
}
