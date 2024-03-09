import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Input() curentPageChange: number | null = null;
  @Input() maxPagesChange: number | null = null;
  @Output() newPageSelection = new EventEmitter<number>();

  pages!: Array<number>;

  constructor(){}
  
  ngOnInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("Changes - max pages: " + this.maxPagesChange + " current page: " + this.curentPageChange);
    this.pages = Array(this.maxPagesChange).fill(0).map((n,i) => i);
  }

  pageSelected(num: number){
    if(this.maxPagesChange && num >= 0 && num < this.maxPagesChange)
      this.newPageSelection.emit(num);
  }
}
