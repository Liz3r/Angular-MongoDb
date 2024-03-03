import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";

export const selectAuthFeature = (state: AppState) => state.auth;

export const selectIsLogged = createSelector(
    selectAuthFeature,
    (authState) => authState.isLogged
);

export const selectError = createSelector(
    selectAuthFeature,
    (authState) => authState.error
);

export const selectIsLoading = createSelector(
    selectAuthFeature,
    (authState) => authState.isLoading
);
