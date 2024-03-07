import { AuthState } from "./auth.reducer";
import { ProductsState } from "./products.reducer";


export interface AppState{
    auth: AuthState,
    prod: ProductsState
}