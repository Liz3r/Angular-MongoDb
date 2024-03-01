import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
    ) { }


  checkToken(): boolean{
    this.http.get<{hasToken: boolean}>(`${environment.apiUrl}/checkToken`, { withCredentials: true })
    .pipe(
      //catchError()
    );
    return true;
  }

  login(){

  }
}

const errorHandler = (error: HttpErrorResponse) =>{
  //const errorMessage = error.status === 
}