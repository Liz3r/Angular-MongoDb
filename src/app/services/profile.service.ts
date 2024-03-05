import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor( private http: HttpClient ) { }

    changePassword(password: string, newPassword: string){
        return this.http.post(`${environment.apiUrl}/changePassword`,{password: password, newPassword: newPassword}, {withCredentials: true});
    }
}


