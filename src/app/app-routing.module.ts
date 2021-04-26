import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { MealsComponent } from './meals/meals.component';
import { MealsService } from './meals/meals.service';

const routes: Routes = [
  { path: 'swipe', component: MealsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/swipe', pathMatch: 'full'},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [MealsService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
