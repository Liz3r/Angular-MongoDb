import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Observer, Subject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/state/app-state';
import { auth } from 'src/app/state/auth.actions';
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
  searchResult$!: Observable<Product[]>;
  searchInput$ = new Subject<String>();
  
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  )
  {

  }


  onSearch():void{
    this.searchInput$.next(this.inputVal);
  }

  ngOnInit(): void { 
    
    // this.searchResult$ = this.searchInput$
    // .pipe(
    //   debounceTime(500),
    //   switchMap((search) => {
    //       return this.http.get<{prod: Product[], count: Number}>(`${environment.apiUrl}/searchAllItems/0/${search}`, {withCredentials: true});
    //   }),
    //   catchError(error => of([]))
    //   );
  }

}
