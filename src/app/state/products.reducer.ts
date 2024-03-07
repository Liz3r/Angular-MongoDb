import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "../models/product";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./products.actions";


export interface ProductsState extends EntityState<Product>{

    page: Number,
    maxPage: Number,

    isLoading: boolean,
    error: string | null,

}
const adapter = createEntityAdapter<Product>();

const initialProductsState: ProductsState = adapter.getInitialState({
    page: 0,
    maxPage: 0,

    isLoading: false,
    error: null
});

export const ProductsReducer =  createReducer(
    initialProductsState,
    on(Actions.loadProducts,(state) => ({...state, isLoading: true})),
    on(Actions.loadProductsSuccess, (state, { products }) => adapter.setAll(products,{...state, isLoading: false})),
    on(Actions.loadProductsFailure, (state, {error}) => ({...state, error: error, isLoading: false }))
);