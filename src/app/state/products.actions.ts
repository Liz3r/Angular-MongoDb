import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";


export const loadProducts = createAction(
    'Load Products',
    props<{search: string}>()
);


export const loadProductsSuccess = createAction(
    'Load Products Success',
    props<{products: Product[], maxPage: Number}>()
);


export const loadProductsFailure = createAction(
    'Load Products Failure',
    props<{error: string}>()
);