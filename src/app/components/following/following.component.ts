import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscriber, debounce, debounceTime, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy{

  products$!: Observable<Product[]>;
  searchInput$: Subject<String>;
  subscription!: any;



  constructor(
    private router: Router,
    private http: HttpClient
  ){
    this.searchInput$ = new Subject<String>();
  }

  onInputChange(e:any):void{
    this.searchInput$.next(e.target.value);
  }

  ngOnInit(): void { 
    
    this.products$ = this.http.get<Product[]>(`${environment.apiUrl}/getFollowedItems`, { withCredentials: true});
    
    this.subscription = this.searchInput$
    .pipe(
      debounceTime(500),
      switchMap((search) => {
        return this.products$ = this.http.get<Product[]>(`${environment.apiUrl}/getFollowedItemsSearch/${search}`, {withCredentials: true});
      }))
    .subscribe(res => {
      if(res)
        console.log(res);
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
