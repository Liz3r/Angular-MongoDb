import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import * as ProdActions from './products.actions';
import { catchError, map, of, pipe, switchMap, tap, withLatestFrom } from "rxjs";
import { Action, Store } from "@ngrx/store";
import { AppState } from "./app-state";
import { selectCurrentPage, selectItemsPerPage } from "./products.selector";


@Injectable()
export class ProductsEffects{

    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private store: Store<AppState>
        ){}

    
    loadProducts$ = createEffect( () =>{
        let count = 0;
        return this.actions$.pipe(
            ofType(ProdActions.loadProducts),
            withLatestFrom(this.store.select(selectItemsPerPage)),
            switchMap(([{search, path},itemsPerPage]) => {
                if(path === 'home'){
                    return this.productService.searchHomeProducts(search).pipe(
                        //tap((response) => { console.log(response.length)}),
                        map((response) => ProdActions.loadProductsSuccess({products: response, maxPage: Math.ceil(response.length/itemsPerPage)})),
                        catchError((error) => of(ProdActions.loadProductsFailure({error: error})))
                        )
                }
                if(path === 'following'){
                    return this.productService.searchFollowingProducts(search).pipe(
                        map((response) => ProdActions.loadProductsSuccess({products: response, maxPage: Math.ceil(response.length/itemsPerPage)})),
                        catchError((error) => of(ProdActions.loadProductsFailure({error: error})))
                        )
                }
                if(path === 'my-products'){
                    return this.productService.searchMyProducts(search).pipe(
                        map((response) => ProdActions.loadProductsSuccess({products: response, maxPage: Math.ceil(response.length/itemsPerPage)})),
                        catchError((error) => of(ProdActions.loadProductsFailure({error: error})))
                        )
                }

                return of(ProdActions.loadProductsFailure({error: 'Invalid input path'}));
            })
        )
    })
}
