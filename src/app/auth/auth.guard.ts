import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { Store, select } from "@ngrx/store"
import { Observable, map, of, tap } from "rxjs"
import { AppState } from "../state/app-state"
import { selectIsLogged } from "../state/auth.selector"
import { auth } from "../state/auth.actions"


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        //console.log("logged out " + state.url);
        return this.store.pipe(
            select(selectIsLogged),
            tap((isLogged) => {
                console.log(isLogged);
                
                if(isLogged) {
                    return ((state.url == '/login' || state.url == '/register')? this.router.navigate(['/home']) : true);
                } else {
                    console.log(((state.url != '/login' && state.url != '/register')? this.router.navigate(['/login']) : true));
                    return true;
                }
            })
        );
    }
}

@Injectable({providedIn: 'root'})
export class CheckAuth implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.store.dispatch(auth());
        return of(true);
    }
}
