import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, debounceTime, filter, from, map, of, switchMap, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { loadProducts } from 'src/app/state/products.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit{

  products$!: Observable<any>;
  searchInput$ = new BehaviorSubject<string>('');
  searchSub!: Subscription;

  constructor(
    private router: Router,
    private store: Store
  ){

  }

  deleted = () =>{
    this.searchInput$.next('');
  }

  onInputChange(e:any):void{
    this.searchInput$.next(e.target.value);
  }

  ngOnInit(): void { 
    this.searchSub = this.searchInput$
    .pipe(debounceTime(500))
    .subscribe((search) => {
      this.store.dispatch(loadProducts({search: search, path: 'my-products'}))
    });
  }

  ngOnDestroy(): void{
    this.searchSub.unsubscribe();
  }

  addItemPage(){
    this.router.navigate(["/add-item"]);
  }

}
