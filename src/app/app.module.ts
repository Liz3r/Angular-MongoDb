import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeadComponent } from './components/head/head.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { FollowingComponent } from './components/following/following.component';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { AuthGuard } from './auth/auth.guard';
import { ShowProductsComponent } from './components/show-products/show-products.component';
import { ProductsEffects } from './state/products.effects';
import { ProductsReducer } from './state/products.reducer';
import { ProductsPageNavComponent } from './components/products-page-nav/products-page-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeadComponent,
    ProductComponent,
    ProfileComponent,
    MyProductsComponent,
    AddItemComponent,
    ItemDetailsComponent,
    FollowingComponent,
    ShowProductsComponent,
    ProductsPageNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot({ auth: authReducer, prod: ProductsReducer }),
    EffectsModule.forRoot([AuthEffects, ProductsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
