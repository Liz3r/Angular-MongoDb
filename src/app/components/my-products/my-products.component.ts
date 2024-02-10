import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, debounceTime, filter, from, map, of, switchMap, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit{

  products$!: Observable<any>;
  searchResult$!: Observable<Product[]>;
  searchInput$ = new BehaviorSubject<String>('');

  constructor(
    private router: Router,
    private http: HttpClient
  ){

  }

  deleted = () =>{
    this.searchInput$.next('');
  }

  onInputChange(e:any):void{
    this.searchInput$.next(e.target.value);
  }

  ngOnInit(): void { 
    //this.searchResult$ = this.http.get<Product[]>(`${environment.apiUrl}/getItemsByUser`, { withCredentials: true});
    this.searchResult$ = this.searchInput$
    .pipe(
      debounceTime(500),
      switchMap((search) => {
          return this.http.get<Product[]>(`${environment.apiUrl}/searchItemsByUser/${search}`, {withCredentials: true});
      }));

  }

  addItemPage(){
    this.router.navigate(["/add-item"]);
  }

}
