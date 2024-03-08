import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";
import { Product } from "../models/product";

export const selectProdFeature = (state: AppState) => state.prod;

export const selectAuthState =  createSelector(
    selectProdFeature,
    (prodState) => prodState
);

export const selectCurrentPage = createSelector(
    selectProdFeature,
    (prodState) => prodState.currentPage
);

export const selectMaxPage = createSelector(
    selectProdFeature,
    (prodState) => prodState.maxPage
);

export const selectProducts = createSelector(
    selectProdFeature,
    (prodState) => Object.values(prodState.entities).filter( (prod) => prod != null).map(prod => <Product>prod)
);

