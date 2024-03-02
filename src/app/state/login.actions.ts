import { createAction, props } from "@ngrx/store";


export const login = createAction(
    'Login', props<{
        email: string,
        password: string
    }>()
);

export const loginSuccess = createAction(
    'Login Success',
    props<{token: string}>()
);

export const loginFailure = createAction(
    'Login Failure',
    props<{error: string}>()
);