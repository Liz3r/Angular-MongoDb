import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  @Input() product!: Product;
  @Input() prev!: String;

  constructor(
    private router: Router
  ) { }


  itemDetailsPage(){
    this.router.navigate(['itemDetails'], {state: {itemId: this.product._id, prev: this.prev}});
  }
}
