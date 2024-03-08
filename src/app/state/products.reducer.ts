import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "../models/product";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./products.actions";
import { max } from "rxjs";


export interface ProductsState extends EntityState<Product>{

    currentPage: Number,
    maxPage: Number,

    isLoading: boolean,
    error: string | null,

}
const adapter = createEntityAdapter<Product>({
    selectId: (prod: Product) => prod._id
});

const initialProductsState: ProductsState = adapter.getInitialState({
    currentPage: 0,
    maxPage: 0,

    isLoading: false,
    error: null
});

export const ProductsReducer =  createReducer(
    initialProductsState,
    on(Actions.loadProducts,(state) => ({...state, isLoading: true})),
    on(Actions.loadProductsSuccess, (state, { products, maxPage }) => adapter.setAll(products,{...state, maxPage: maxPage, currentPage: 0, isLoading: false})),
    on(Actions.loadProductsFailure, (state, {error}) => ({...state, error: error, currentPage: 0, isLoading: false }))
);