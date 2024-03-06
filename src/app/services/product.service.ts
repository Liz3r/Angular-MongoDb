import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor( private http: HttpClient ) { }

    
    searchHomeProducts(search: string, page: Number){
        return this.http.get<{products: Product[], totalCount: Number}>(`${environment.apiUrl}/searchAllItems/0/${search}`, {withCredentials: true});
    }
}


