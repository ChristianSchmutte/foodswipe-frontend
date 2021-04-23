import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsService } from './meals/meals.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [MealsService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
