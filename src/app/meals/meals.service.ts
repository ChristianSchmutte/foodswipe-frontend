import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Meal } from './meal.interface';
@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private readonly baseUrl = 'http://localhost:8080/meals';
  readonly meal$ = new BehaviorSubject<Meal>({} as Meal);
  private mealList: Meal[] = [];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
  }

  constructor(
    private http: HttpClient,
  ) { }

  getNextMeal(): void {
    if (this.mealList.length < 3) this.fetchNewMeals();
    else {
      console.log('Hello')
      const nextMeal = this.mealList.shift();
      if (nextMeal) this.meal$.next(nextMeal);
    }
  }

  private fetchNewMeals(): void {
    this.http.get<Meal[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Meal[]>('get meals', []))
      )
      .subscribe(newMeals => {
        this.mealList = [...this.mealList, ...newMeals];
        this.meal$.next(this.mealList.shift()!);
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
