import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Product } from "../models/product";


export interface ProductsState extends EntityState<Product>{
    page: Number,
    selectedProductId: string | null
}
const adapter = createEntityAdapter<Product>();

adapter.getInitialState({
    page: 0,
    selectedProductId: null
})