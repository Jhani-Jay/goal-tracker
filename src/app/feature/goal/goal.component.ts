import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '@app/core/model/AppState.model';
import { Goal, Task } from '@app/core/model/goal.model';
import { AppService } from '@app/core/services/app-service/app.service';
import { GoalTrackerService } from '@app/core/services/goal-tracker-service/goal-tracker.service';
import { goal } from '@app/core/state/goal.selector';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmService: ConfirmationService,
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
    )
    
    // console.log(this.goalTrackerService.selectedGoal()?.id)
    // if (this.selectedGoalId) {
    //   console.log('selected goal id: ', this.selectedGoalId);
    //   this.activeGoal$ = this.store.select(goal(this.selectedGoalId));
    //   this.activeGoal$.subscribe(value => {
    //     console.log(value);
    //   })

    // } else {
    //   this.router.navigate(['']);
    // }
  }

  displayMilestoneForm() {
    this.appService.showFormDialog();
  }

  showSubTaskDetails(task: Task) { 
    this.goalTrackerService.selectedSubtask.set(task);
    this.appService.showSubtaskDetail();
  }

  
  // delete() {
  //     this.confirmService.confirm({
  //         message: 'Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.',
  //         header: 'Delete this goal?',
  //         icon: 'pi pi-info-circle',
  //         acceptButtonStyleClass:"accept-delete",
  //         rejectButtonStyleClass:"reject-delete",
  //         acceptIcon:"none",
  //         rejectIcon:"none",
  //         accept: () => {
  //           // dispatch action from here
  //           const id = this.selectedGoal()?.id;
  //           if (id) {
  //             this.store.dispatch(onDeleteGoal({id}));
  //             this.selectedGoal.set(null);
  //             this.router.navigate(['']);
  //           }
  //         },
  //         reject: () => {
  //           return;
  //         }
  //     })
  // }


}
