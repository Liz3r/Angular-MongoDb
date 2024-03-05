import { createAction, props } from "@ngrx/store";


export const login = createAction(
    'Login', props<{
        email: string,
        password: string
    }>()
);

export const auth = createAction(
    'Auth'
);

export const authSuccess = createAction(
    'Auth Success'
);

export const authFailure = createAction(
    'Auth Failure',
    props<{error: string | null}>()
);