import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { Store, select } from "@ngrx/store"
import { Observable, filter, map, of, take, tap } from "rxjs"
import { AppState } from "../state/app-state"
import { selectAuthFeature, selectAuthState, selectIsLogged } from "../state/auth.selector"
import { auth } from "../state/auth.actions"


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store.select(selectAuthState)
        .pipe(
            tap((authState) => {
                if(!authState.isLoading){
                    this.store.dispatch(auth())
                }}),
            filter((authState) => authState.isLoading === false),
            take(1),
            map((authState) => {
                console.log(authState.isLogged);
                if(authState.isLogged) {
                    if(state.url === '/login' || state.url === '/register'){
                        this.router.navigate(['/home']);
                        return false;
                    }
                    return true;
                } else {
                    if(state.url !== '/login' && state.url !== '/register'){
                        this.router.navigate(['/login']);
                        return false;
                    }
                    return true;
                }
            })
        );


    }
}

// @Injectable({providedIn: 'root'})
// export class CheckAuth implements CanActivate {
//     constructor(
//         private store: Store<AppState>,
//         private router: Router) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//         this.store.dispatch(auth());
//         return of(true);
//     }
// }
