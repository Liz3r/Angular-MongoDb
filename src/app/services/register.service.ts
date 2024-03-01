import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor( private http: HttpClient ) { }

    register(name:string, surname:string, email: string, password: string, address: string): Observable<any>{

        return this.http.post(`${environment.apiUrl}/register`, {
            name: name,
            surname: surname,
            email: email,
            password: password,
            address: address
        });
    }
}


