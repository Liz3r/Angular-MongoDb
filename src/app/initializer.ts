import { APP_INITIALIZER, NgModule } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./state/app-state";
import { auth } from "./state/auth.actions";
import { selectIsLogged } from "./state/auth.selector";



export function appInitializerFactory(
    store: Store<AppState>
) {
    return () => {store.select(selectIsLogged).subscribe((val) => console.log("new state, isLogged: "+val)); store.dispatch(auth()) };
}

@NgModule({
    providers:[
        {
              provide: APP_INITIALIZER,
              useFactory: appInitializerFactory,
              deps: [Store],
              multi: true
           }]
})
export class InitializerModule{};