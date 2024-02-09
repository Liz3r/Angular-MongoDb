import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, Observer, debounceTime, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
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
  searchInput$ = new BehaviorSubject<String>('');
  
  constructor(
    private http: HttpClient,
  )
  {

  }


  onSearch():void{
    this.searchInput$.next(this.inputVal);
  }

  ngOnInit(): void { 
    this.searchResult$ = this.searchInput$
    .pipe(
      debounceTime(500),
      switchMap((search) => {
        console.log(search == '');
          return this.http.get<Product[]>(`${environment.apiUrl}/searchAllItems/${search}`, {withCredentials: true});
      }));
  }

}
