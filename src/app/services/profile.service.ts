import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor( private http: HttpClient ) { }

    getProfileDetails(): Observable<User>{
      return this.http.get<User>(`${environment.apiUrl}/getUserProfile`,{ withCredentials: true});
    }

    updateProfile(data: FormData){
      return this.http.post(`${environment.apiUrl}/updateUserProfile`, data, { withCredentials: true});
    }

    changePassword(password: string, newPassword: string){
        return this.http.post(`${environment.apiUrl}/changePassword`,{password: password, newPassword: newPassword}, {withCredentials: true});
    }
}


