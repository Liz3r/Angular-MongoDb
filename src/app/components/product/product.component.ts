import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  @Input() product!: Product;
  @Input() prev!: String;

  current!: any;

  confirmDel = false;

  constructor(
    private router: Router,
    private location: Location
  ) { 
    this.current = location.path();
  }

  deleteItem():void{
    //implementiraj
  }

  priceToString(): String{
    var retPrice = '';
    var priceStr = this.product.price.toString();
    var strArr = [];
    if(priceStr){
      while(priceStr.length > 3){
        strArr.push(priceStr.slice(priceStr.length-3));
        priceStr = priceStr.slice(0, priceStr.length-3);
      }

      retPrice = priceStr + ".";

      while(strArr.length > 1){
        retPrice += strArr.pop() + ".";
      }
      retPrice += strArr.pop() + " " + this.product.currency;
    }

    return retPrice;
  }

  itemDetailsPage(){
    this.router.navigate(['itemDetails'], {state: {itemId: this.product._id, prev: this.prev}});
  }
}
