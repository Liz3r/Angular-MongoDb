import { Component, OnInit } from '@angular/core';
import { AppState } from './state/app-state';
import { Store } from '@ngrx/store';
import { auth } from './state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'Angular app';
  
  constructor(
  ){}


  ngOnInit(): void {
  }
}
