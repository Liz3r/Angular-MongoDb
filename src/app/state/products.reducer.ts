import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "../models/product";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./products.actions";


export interface ProductsState extends EntityState<Product>{
    isLoading: boolean,
    error: string | null,

    page: Number,
    maxPage: Number,

}
const adapter = createEntityAdapter<Product>();

const initialProductsState: ProductsState = adapter.getInitialState({
    isLoading: false,
    page: 0,
    maxPage: 0,
    error: null
});

export const ProductsReducer =  createReducer(
    initialProductsState,
    on(Actions.loadProducts,(state, {search}) => ({...state, isLoading: true})),
    on(Actions.loadProductsSuccess, (state, { products }) => adapter.setAll(products,state))
);