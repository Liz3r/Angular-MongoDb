import { Injectable } from "@angular/core";
import { Observable, audit } from "rxjs";
import { AppState } from "../state/app-state";
import { Store } from "@ngrx/store";
import { selectIsLoading } from "../state/auth.selector";
import { auth } from "../state/auth.actions";

@Injectable({providedIn: 'root'})
export class logging{

    logging$!: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.logging$ = store.select(selectIsLoading);
    }

    load(){
        this.store.dispatch(auth());
    }
}