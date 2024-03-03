import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }


    login(email: string, password: string): Observable<any>{
      return this.http.post(`${environment.apiUrl}/login`, {email: email, password: password}, { withCredentials: true });
    }

    auth(): Observable<any>{
      return this.http.get(`${environment.apiUrl}/auth`, { withCredentials: true });
    }


}
