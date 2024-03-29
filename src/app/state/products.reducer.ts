import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "../models/product";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./products.actions";
import { max } from "rxjs";


export interface ProductsState extends EntityState<Product>{

    currentPage: number,
    maxPage: number,
    itemsPerPage: number,

    isLoadingProducts: boolean,
    error: string | null,

}
const adapter = createEntityAdapter<Product>({
    selectId: (prod: Product) => prod._id
});

const initialProductsState: ProductsState = adapter.getInitialState({
    currentPage: 0,
    maxPage: 0,
    itemsPerPage: 7,

    isLoadingProducts: false,
    error: null
});

export const ProductsReducer =  createReducer(
    initialProductsState,
    on(Actions.loadProducts,(state) => ({...state, isLoadingProducts: true})),
    on(Actions.loadProductsSuccess, (state, { products, maxPage }) => adapter.setAll(products,{...state, maxPage: maxPage, currentPage: 0, isLoadingProducts: false})),
    on(Actions.loadProductsFailure, (state, {error}) => ({...state, error: error, currentPage: 0, isLoadingProducts: false })),
    on(Actions.pageSelection, (state,{ selectedPage }) =>{ 
        if(selectedPage >= 0 && selectedPage <= state.maxPage)
            return {...state, currentPage: selectedPage}
        return state; 
    })
);