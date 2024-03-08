import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import * as ProdActions from './products.actions';
import { catchError, map, of, pipe, switchMap, tap, withLatestFrom } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { AppState } from "./app-state";
import { selectCurrentPage } from "./products.selector";


@Injectable()
export class ProductsEffects{

    constructor(
        private actions$: Actions,
        private productService: ProductService
        ){}

    
    loadProducts$ = createEffect( () =>{
        let count = 0;
        return this.actions$.pipe(
            ofType(ProdActions.loadProducts),
            switchMap(({search}) => 
                this.productService.searchHomeProducts(search).pipe(
                    //tap((response) => { console.log(response.length)}),
                    map((response) => ProdActions.loadProductsSuccess({products: response, maxPage: Math.ceil(response.length/8)})),
                    catchError((error) => of(ProdActions.loadProductsFailure({error: error})))
                    )
            )
        )
    })
}
