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
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  {path: "register", component: RegisterComponent, canActivate: [AuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "my-products", component: MyProductsComponent, canActivate: [AuthGuard]},
  {path: "add-item", component: AddItemComponent, canActivate: [AuthGuard]},
  {path: 'itemDetails', component: ItemDetailsComponent, canActivate: [AuthGuard]},
  {path: 'following', component: FollowingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
