import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, Subscriber, Subscription, debounce, debounceTime, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { loadProducts } from 'src/app/state/products.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy{

  products$!: Observable<any>;
  searchInput$ = new BehaviorSubject<string>('');
  searchSub!: Subscription;

  constructor(
    private store: Store
  ){
    
  }

  onInputChange(e:any):void{
    this.searchInput$.next(e.target.value);
  }

  ngOnInit(): void { 
    this.searchSub = this.searchInput$
    .pipe(debounceTime(500)).
    subscribe((search) => {
      this.store.dispatch(loadProducts({search: search, path: 'following'}));
    });
  }

  ngOnDestroy(): void{
    this.searchSub.unsubscribe();
  }
}
