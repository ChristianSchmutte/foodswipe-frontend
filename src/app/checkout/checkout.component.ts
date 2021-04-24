import { Component, OnInit } from '@angular/core';
import { Meal } from '../meals/meal.interface';
import { MealsService } from '../meals/meals.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  currentMeal?: Meal;

  constructor(
    private checkOutService: CheckoutService,
    private mealService: MealsService
  ) { }

  ngOnInit(): void {
    this.currentMeal = this.mealService.meal$.getValue();
  }
  
}
