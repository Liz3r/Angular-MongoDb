import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscriber, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app-state';
import { selectMaxPage } from 'src/app/state/products.selector';

@Component({
  selector: 'app-products-page-nav',
  templateUrl: './products-page-nav.component.html',
  styleUrls: ['./products-page-nav.component.scss']
})
export class ProductsPageNavComponent implements OnInit, OnChanges{

  maxPages = 0;
  currentPage = 0;

  @Input() curentPageChange: Number | null = null;
  @Input() maxPagesChange: Number | null = null;


  constructor(){}
  
  ngOnInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes - max pages: " + this.maxPagesChange + " current page: " + this.curentPageChange);
    
  }

}
