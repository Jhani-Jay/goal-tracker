import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '@app/core/model/AppState.model';
import { Goal } from '@app/core/model/goal.model';
import { GoalTrackerService } from '@app/core/services/goal-tracker-service/goal-tracker.service';
import { goal } from '@app/core/state/goal.selector';
import { Store } from '@ngrx/store';

// third party libraries
import { ButtonModule } from 'primeng/button';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [AsyncPipe, ButtonModule, ],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
  activeGoal$!:Observable<Goal | null>;
  selectedGoalId = this.goalTrackerService.selectedGoal()?.id;
  id = this.goalTrackerService.selectedGoal

  constructor (
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private goalTrackerService: GoalTrackerService,
  ) {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
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
}
