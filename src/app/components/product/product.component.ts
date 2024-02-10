import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  @Input() product!: Product;
  @Input() prev!: String;
  @Input() deleted!: ()=>void;

  current!: any;

  confirmDel = false;

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) { 
    this.current = location.path();
  }

  deleteItem():void{
    this.http.delete(`${environment.apiUrl}/deleteItem/${this.product._id}`, {withCredentials: true})
    .subscribe(res=>{
      console.log(res);
      this.deleted();
    })
  }

  fixTitle(text:String):String{
    if(text.length > 25){
      return text.slice(0,61) + "...";
    }
    return text;
  }

  fixDescription(text:String):String{
    if(text.length > 60){
      return text.slice(0,90) + "...";
    }
    return text;
  }

  priceToString(): String{
    var retPrice = '';
    var priceStr = this.product.price.toString();
    var strArr = [];
    if(priceStr.length > 3){
      while(priceStr.length > 3){
        strArr.push(priceStr.slice(priceStr.length-3));
        priceStr = priceStr.slice(0, priceStr.length-3);
      }

      retPrice = priceStr + ".";

      while(strArr.length > 1){
        retPrice += strArr.pop() + ".";
      }
      retPrice += strArr.pop() + " " + this.product.currency;
    }else{
      retPrice = priceStr + " " + this.product.currency;
    }

    return retPrice;
  }

  itemDetailsPage(){
    this.router.navigate(['itemDetails'], {state: {itemId: this.product._id, prev: this.prev}});
  }
}
