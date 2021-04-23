import { Component, OnInit } from '@angular/core';
import { Meal } from './meal.interface';
import { MealsService } from './meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  meals: Meal[] = [];
  currentMeal?: Meal;

  constructor(private readonly mealsService: MealsService) { }

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals(): void {
    this.mealsService.getMeals()
      .subscribe((meals) => {
        this.meals.push(...meals);
        this.currentMeal = this.meals.shift();
      });
  }

  handleLike(): void {
    // TODO route check out with currentMeal pass
  }

  handleDislike(): void {
    this.currentMeal = this.meals.shift();
    // TODO: once SQL pagination is a thing check size of meals and resize meals
  }

}