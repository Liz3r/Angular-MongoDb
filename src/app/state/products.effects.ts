import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import * as ProdActions from './products.actions';
import { catchError, map, of, pipe, switchMap, withLatestFrom } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { AppState } from "./app-state";
import { selectPage } from "./products.selector";


@Injectable()
export class ProductsEffects{

    constructor(
        private actions$: Actions,
        private productService: ProductService
        ){}

    
    loadProducts$ = createEffect( () =>
        this.actions$.pipe(
            ofType(ProdActions.loadProducts),
            switchMap(({search}) => 
                this.productService.searchHomeProducts(search).pipe(
                    map((response) => ProdActions.loadProductsSuccess({products: response})),
                    catchError((error) => of(ProdActions.loadProductsFailure({error: error})))
                    )
            )
        )
    )
}
