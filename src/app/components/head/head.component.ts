import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {

  phoneIcon = faPhone;

  constructor(
    private router: Router
  ){}
  
  profile(): void{
    this.router.navigate(['/profile']);
  }

  home():void{
    this.router.navigate(['/home']);
  }
}
