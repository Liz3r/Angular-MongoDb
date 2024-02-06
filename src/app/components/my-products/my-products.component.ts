import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent {

  products!: Observable<Product>;

  constructor(
    private router: Router
  ){

  }

  addItemPage(){
    this.router.navigate(["/add-item"]);
  }
}
