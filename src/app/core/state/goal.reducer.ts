import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { onLoadGoals, onLoadGoalSuccess, onLoadGoalFailure, onPostGoal, onUpdateGoal, onDeleteGoal } from './goal.action';
import { Goal } from '../model/goal.model';

// EntityState is a generic interface that takes the type of the entity as a type parameter
export interface GoalState extends EntityState<Goal>{
    error: string,
    loading: boolean,
}; 
export const goalAdapter: EntityAdapter<Goal> = createEntityAdapter<Goal>();
export const initialState: GoalState = goalAdapter.getInitialState({
    error: '',
    loading: false,
});

export const goalReducer = createReducer(
    initialState,
    on(onLoadGoals, state => state),
    on(onLoadGoalSuccess, (state, {goals}) => goalAdapter.setAll(goals, state)),
    on(onPostGoal, (state, {goal}) => goalAdapter.addOne(goal, state)),
    on(onUpdateGoal, (state, {goal}) => {
        const { id } = goal;
        if (id) {
            return goalAdapter.updateOne({id: id, changes: goal}, state)
        };
        return state;
    }),
    on(onDeleteGoal, (state, {id}) => goalAdapter.removeOne(id, state)),
    on(onLoadGoalFailure, (state, {error}) => ({...state, error})),
)