import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { onLoadGoals, onLoadGoalSuccess, onLoadGoalFailure } from './goal.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { generateId } from '@shared/utils/uuid';

// local imports
import { GoalTrackerService } from '../services/goal-tracker-service/goal-tracker.service';

@Injectable()
export class GoalEffects {
    constructor(
        private actions$: Actions,
        private goalTrackerService: GoalTrackerService,
    ) {};

    loadGoals$ = createEffect(() => 
        this.actions$.pipe(
            ofType(onLoadGoals),
            switchMap(() => {
                return this.goalTrackerService.allGoals().pipe(
                    map(data => {
                        const id = generateId();
                        const res = data.map(goal => ({...goal, id}));
                        return onLoadGoalSuccess({goals: res});
                    }),
                    catchError((error) => of(onLoadGoalFailure({error: 'error'})))
                )
            })
        )
    );

    // postGoal$ = createEffect(() => ());
}