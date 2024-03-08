import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageNavComponent } from './products-page-nav.component';

describe('ProductsPageNavComponent', () => {
  let component: ProductsPageNavComponent;
  let fixture: ComponentFixture<ProductsPageNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsPageNavComponent]
    });
    fixture = TestBed.createComponent(ProductsPageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
