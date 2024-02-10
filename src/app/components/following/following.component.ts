import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscriber, debounce, debounceTime, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy{

  products$!: Observable<any>;
  searchResult$!: Observable<Product[]>;
  searchInput$ = new BehaviorSubject<String>('');

  constructor(
    private router: Router,
    private http: HttpClient
  ){
    
  }

  onInputChange(e:any):void{
    this.searchInput$.next(e.target.value);
  }

  ngOnInit(): void { 
    this.searchResult$ = this.searchInput$
    .pipe(
      debounceTime(500),
      switchMap((search) => {
          return this.http.get<Product[]>(`${environment.apiUrl}/getFollowedItemsSearch/${search}`, {withCredentials: true});
      }));
  }

  ngOnDestroy(): void{
  }
}
