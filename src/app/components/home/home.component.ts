import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { Observer } from 'rxjs';
import check from 'src/app/checkCookie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  private checkCookie = inject(check);

  constructor(
    private http: HttpClient,
  )
  {

  }

  ngOnInit(): void {
    
    this.checkCookie.cookie();

    // this.http.get("http://localhost:5123/user",{withCredentials: true})
    // .subscribe((res:any)=>{
    //     console.log(res);
    //   }
    // )
  }

}
