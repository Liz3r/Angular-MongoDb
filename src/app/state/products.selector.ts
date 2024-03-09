import { createSelector } from "@ngrx/store";
import { AppState } from "./app-state";
import { Product } from "../models/product";
import { ProductsState } from "./products.reducer";

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
    (prodState) => Object.values(prodState.entities)
    .filter( (prod,index) => prod != null && (index >= (prodState.currentPage*prodState.itemsPerPage) && (index < (prodState.currentPage+1)*prodState.itemsPerPage)))
    .map(prod => <Product>prod)
    
);



//(prodState) =>  Object.values(prodState.entities).filter( (prod) => prod != null).map(prod => <Product>prod)