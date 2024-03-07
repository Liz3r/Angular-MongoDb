import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor( private http: HttpClient ) { }

    
    searchHomeProducts(search: string){
        return this.http.get<Product[]>(`${environment.apiUrl}/searchAllItems/${search}`, {withCredentials: true});
    }
}


