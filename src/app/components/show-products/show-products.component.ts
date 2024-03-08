import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/state/app-state';
import { selectCurrentPage, selectMaxPage, selectProducts } from 'src/app/state/products.selector';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit{
  
  products$!: Observable<any>;
  maxPages$!: Observable<Number>;
  currentPage$!: Observable<Number> ;

  constructor(
    private store: Store<AppState>
  ){}
  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.maxPages$ = this.store.select(selectMaxPage).pipe(filter((val) => val != null));
    this.currentPage$ = this.store.select(selectCurrentPage).pipe(filter((val) => val != null));
  }
}
