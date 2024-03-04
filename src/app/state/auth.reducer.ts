import { createReducer, on } from "@ngrx/store";
import { auth, login, authFailure, authSuccess } from "./auth.actions";

export interface AuthState{
    isLogged: boolean,
    error: string | null,
    isLoading: boolean
}

const initialAuthState: AuthState = {
    isLogged: false,
    error: null,
    isLoading: false
};

export const authReducer = createReducer(
    initialAuthState,
    on(login, state => ({...state, isLoading: true})),
    on(auth, state => ({...state, isLoading: true})),
    on(authSuccess, (state) => ({...state, isLogged: true, isLoading: false})),
    on(authFailure, (state, {error}) => ({isLogged: false, error: error, isLoading: false}))
);

