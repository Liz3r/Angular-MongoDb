import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Observer, Subject, Subscription, catchError, debounceTime, of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/state/app-state';
import { auth } from 'src/app/state/auth.actions';
import { loadProducts } from 'src/app/state/products.actions';
import { selectProducts } from 'src/app/state/products.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  searchIcon = faSearch;

  inputVal = '';

  products$!: Observable<any>;
  searchInput$ = new BehaviorSubject<string>('');
  searchSub!: Subscription;
  
  constructor(
    private store: Store<AppState>
  ){}

  onSearch():void{
    this.searchInput$.next(this.inputVal);
  }

  ngOnInit(): void { 
    this.searchSub = this.searchInput$.subscribe((search)=>{
      this.store.dispatch(loadProducts({search: search, path: 'home'}))
    }) 
  }

  ngOnDestroy(): void{
    this.searchSub.unsubscribe();
  }

}
