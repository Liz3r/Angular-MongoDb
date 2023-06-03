import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{



  constructor(
    private http: HttpClient
  )
  {

  }

  ngOnInit(): void {
    this.http.get("http://localhost:5123/user",{withCredentials: true})
    .subscribe((res:any)=>{
        console.log(res);
      }
    )
  }

}
