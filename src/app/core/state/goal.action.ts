import { createAction, props } from '@ngrx/store';
import { Goal } from '../model/goal.model';

export const onLoadGoals = createAction('[Goal] load goals');
export const onLoadGoalSuccess = createAction(
    '[Goal] load goals successfully',
    props<{goals: Goal[]}>()
);
export const onLoadGoalFailure = createAction(
    '[Goal] load goals failed',
    props<{error: string}>()
);