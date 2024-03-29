import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";


export const loadProducts = createAction(
    'Load Products',
    props<{search: string, path: string}>()
);


export const loadProductsSuccess = createAction(
    'Load Products Success',
    props<{products: Product[], maxPage: number}>()
);


export const loadProductsFailure = createAction(
    'Load Products Failure',
    props<{error: string}>()
);

export const pageSelection = createAction(
    'Select Page',
    props<{selectedPage: number}>()
)