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



  @Input() curentPage: number | null = null;
  @Input() maxPages: number | null = null;
  @Output() newPageSelection = new EventEmitter<number>();

  pages!: Array<number>;

  constructor(){}
  
  ngOnInit(): void {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Changes - max pages: " + this.maxPages + " current page: " + this.curentPage);
    this.pages = Array(this.maxPages).fill(0).map((n,i) => i);
  }

  pageSelected(num: number){
    if(this.maxPages && num >= 0 && num < this.maxPages)
      this.newPageSelection.emit(num);
  }
}
