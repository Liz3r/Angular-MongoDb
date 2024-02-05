import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProductsComponent } from './components/my-products/my-products.component';

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "", component: LoginComponent},
  {path: "profile", component: ProfileComponent},
  {path: "my-products", component: MyProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
