import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";
import { Product } from "../models/product";

export const selectProdFeature = (state: AppState) => state.prod;

export const selectAuthState =  createSelector(
    selectProdFeature,
    (prodState) => prodState
);

export const selectPage = createSelector(
    selectProdFeature,
    (prodState) => prodState.page
);

export const selectProducts = createSelector(
    selectProdFeature,
    (prodState) => Object.values(prodState.entities).filter( (prod) => prod != null).map(prod => <Product>prod)
);
