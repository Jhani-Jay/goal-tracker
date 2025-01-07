import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// third party packages
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

// local imports
import { AppService } from '@app/core/services/app-service/app.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/model/AppState.model';
import { GoalTrackerService } from '@app/core/services/goal-tracker-service/goal-tracker.service';
import { take } from 'rxjs';
import { goal } from '@app/core/state/goal.selector';
import { Task } from '@app/core/model/goal.model';
import { onUpdateGoal } from '@app/core/state/goal.action';

@Component({
  selector: 'app-subtask-details',
  standalone: true,
  imports: [FormsModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule, DropdownModule, InputTextareaModule],
  templateUrl: './subtask-details.component.html',
  styleUrl: './subtask-details.component.scss'
})
export class SubtaskDetailsComponent implements OnInit{
  subTask = input<Task | null>(null);
  close = output<boolean>();
  visible: boolean = true;
  goalId = this.goalTrackerService.goalId();;
  actionGoal: Task | null = (null);
  value:string = '';

  constructor (
    private store: Store<AppState>,
    private appService: AppService,
    private goalTrackerService: GoalTrackerService,
  ) {};

  ngOnInit(): void {
    this.actionGoal = this.goalTrackerService.selectedSubtask();
    console.log(this.actionGoal);
  };

  markAsCompleted() {
    if (!this.goalId) return;
    this.store.select(goal(this.goalId)).pipe(take(1)).subscribe(
      data => {
        const updated = {
          ...data,
          milestones: data?.milestones.map(task => (
            {
              ...task,
              tasks: task.tasks.map(subtask => ({
                ...subtask,
                isCompleted: true,
              }))
            }
          ))
        }
        this.store.dispatch(onUpdateGoal({goal: updated}));
      }
    )
  }
  
  addComment() {
    const comment = this.value;
    if (!this.goalId) return;
    this.store.select(goal(this.goalId)).pipe(take(1)).subscribe(
      data => {
        const updatedGoal = {
          ...data,
          milestones: data?.milestones.map(milestone => ({
            ...milestone,
            tasks: milestone.tasks.map(task => ({
              ...task,
              comments: !task.comments ? [comment, ] : [comment, ...task.comments],
            }))
          }))
        };
        this.store.dispatch(onUpdateGoal({goal: updatedGoal}));
      }
    );
  }

  showDialog() {
    this.appService.showSubtaskDetail();
  }

  hideDialog() {
    this.close.emit(false);
    this.appService.hideDialog();
  }
}
