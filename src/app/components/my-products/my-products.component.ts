import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, map, of, switchMap, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit{

  products$!: Observable<Product[]>;

  constructor(
    private router: Router,
    private http: HttpClient
  ){

  }
  ngOnInit(): void { 
    
    this.products$ = this.http.get<Product[]>(`${environment.apiUrl}/getItems`, { withCredentials: true});
    
  }

  addItemPage(){
    this.router.navigate(["/add-item"]);
  }

}
