import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit{

  id: any | undefined = '';

  constructor( 
    private router: Router,
    private http: HttpClient
  ){

    this.id = this.router.getCurrentNavigation()?.extras.state;
  }


  ngOnInit(): void {
    this.http.get("/getItemDetails", {withCredentials: true}).subscribe(res=>{

    });
  }

  back():void{
    if(typeof(this.id.prev) === 'string')
      this.router.navigate([this.id.prev]);
  }

}
