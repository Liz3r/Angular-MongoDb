import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {
    
    constructor(private actions$: Actions, private authService: AuthService) {}
    
    login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap(({ email, password }) =>
        
            this.authService.login(email, password).pipe(
            map(() => AuthActions.authSuccess()),
            catchError(error => of(AuthActions.authFailure({ error })))
        )
        )
    )
    );

    auth$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AuthActions.auth),
        switchMap(() => 
            this.authService.auth().pipe(
                map(() => AuthActions.authSuccess()),
                catchError(error => of(AuthActions.authFailure({ error })))
            )
        )
    )
    );

}