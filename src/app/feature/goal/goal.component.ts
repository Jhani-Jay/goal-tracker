import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { AppState } from '@app/core/model/AppState.model';
import { Goal, Task } from '@app/core/model/goal.model';
import { AppService } from '@app/core/services/app-service/app.service';
import { GoalTrackerService } from '@app/core/services/goal-tracker-service/goal-tracker.service';
import { goal } from '@app/core/state/goal.selector';
import { Store } from '@ngrx/store';

// third party libraries
import { DialogModule  } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, DialogModule , InputTextModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
  activeGoal$!:Observable<Goal | null>;
  selectedGoalId = this.goalTrackerService.selectedGoal()?.id;
  id = this.goalTrackerService.selectedGoal;

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  constructor (
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private goalTrackerService: GoalTrackerService,
    private appService: AppService,
  ) {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        this.goalTrackerService.goalId.set(id);
        this.activeGoal$ = this.store.select(goal(id));
      }
    );
  }

  displayMilestoneForm() {
    this.appService.showFormDialog();
  }

  showSubTaskDetails(task: Task) { 
    this.goalTrackerService.selectedSubtask.set(task);
    this.appService.showSubtaskDetail();
  }

  


}
