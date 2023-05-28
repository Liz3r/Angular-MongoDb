import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  lista: number[] | undefined;


  ngOnInit(): void {
    this.lista = new  Array(1,2,3,4,5);
  }
}
