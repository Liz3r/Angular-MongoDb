import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { FollowingComponent } from './components/following/following.component';

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "", component: LoginComponent},
  {path: "profile", component: ProfileComponent},
  {path: "my-products", component: MyProductsComponent},
  {path: "add-item", component: AddItemComponent},
  {path: 'itemDetails', component: ItemDetailsComponent},
  {path: 'following', component: FollowingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
