import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {

  phoneIcon = faPhone;

  constructor(
    private router: Router,
    private http: HttpClient
  ){}

  logout():void {
    this.http.post(`${environment.apiUrl}/logout`, {}, { withCredentials: true })
    .subscribe(res => {
      if(res){
        this.router.navigate(['/login']);
      }
    })
  }
  
  profile(): void{
    this.router.navigate(['/profile']);
  }

  home():void{
    this.router.navigate(['/home']);
  }
}
