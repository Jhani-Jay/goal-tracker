import { createSelector } from "@ngrx/store";
import { AppState } from "../model/AppState.model";
import { goalAdapter } from "./goal.reducer";

const { selectAll } = goalAdapter.getSelectors();

const goalFeature = (state:AppState) => state.goal;

export const goals = createSelector(
    goalFeature, selectAll
)
export const goal = (id:string) => createSelector(
    goalFeature, (state) => {
        const selected = state.entities[id];
        return selected || null;
    }
)
export const loadError = createSelector(
    goalFeature,
    (state) => state.error
)
export const loading = createSelector(
    goalFeature,
    (state) => state.loading
)