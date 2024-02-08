import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import check from 'src/app/checkCookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit{

  phoneIcon = faPhone;
  private checkCookie = inject(check);

  constructor(
    private router: Router,
    private http: HttpClient
    
  ){}
  ngOnInit(): void {
    this.checkCookie.cookie();
  }

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

  myProducts():void{
    this.router.navigate(['/my-products']);
  }

  following():void{
    this.router.navigate(['/following']);
  }
}
