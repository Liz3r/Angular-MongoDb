import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import * as ProdActions from './products.actions';
import { switchMap } from "rxjs";


@Injectable()
export class ProductsEffects{

    constructor(
        private actions$: Actions,
        private productService: ProductService
        ){}

    // load$ = createEffect(
    //     this.actions$.pipe(
    //         ofType(ProdActions.loadProducts),
    //         switchMap(({search}) => {
                
    //             this.productService.
    //         })
    //     )
    // )
}