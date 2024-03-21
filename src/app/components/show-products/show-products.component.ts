import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, map, of, withLatestFrom, zip } from 'rxjs';
import { AppState } from 'src/app/state/app-state';
import { selectIsLoading } from 'src/app/state/auth.selector';
import { pageSelection } from 'src/app/state/products.actions';
import { selectCurrentPage, selectIsLoadingProducts, selectMaxPage, selectProducts } from 'src/app/state/products.selector';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit{
  
  products$!: Observable<any>;
  maxPages$!: Observable<number>;
  currentPage$!: Observable<number>;
  isLoading$!: Observable<boolean>;



  constructor(
    private store: Store<AppState>
  ){}
  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoadingProducts);
    
    this.products$ = this.store.select(selectProducts);
    this.maxPages$ = this.store.select(selectMaxPage).pipe(filter((val) => val != null));
    this.currentPage$ = this.store.select(selectCurrentPage).pipe(filter((val) => val != null));
  }

  navigatePages(page: number){
    this.store.dispatch(pageSelection({selectedPage: page}));
  }
}
