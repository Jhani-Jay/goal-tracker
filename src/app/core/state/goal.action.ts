import { createAction, props } from '@ngrx/store';
import { Goal } from '../model/goal.model';

// GET actions
export const onLoadGoals = createAction('[Goal] load goals');
export const onLoadGoalSuccess = createAction(
    '[Goal] load goals successfully',
    props<{goals: Goal[]}>()
);
export const onLoadGoalFailure = createAction(
    '[Goal] load goals failed',
    props<{error: string}>()
);

// POST action
export const onPostGoal = createAction(
    '[Goal] post goal',
    props<{goal: Goal}>(),
);

// EDIT action
export const onUpdateGoal = createAction(
    '[Goal] update goal',
    props<{goal: Partial<Goal>}>(),
);

// DELETE action
export const onDeleteGoal = createAction(
    '[Goal] delete goal',
    props<{id: string}>(),
)