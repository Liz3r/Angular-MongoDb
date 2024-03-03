import { APP_INITIALIZER, NgModule } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./state/app-state";
import { auth } from "./state/auth.actions";



export function appInitializerFactory(
    store: Store<AppState>
) {
    return () => { store.dispatch(auth()) };
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