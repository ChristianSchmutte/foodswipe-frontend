import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Meal } from './meal.interface';
@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private readonly baseUrl = 'http://localhost:8080/meals';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
  }

  constructor(
    private http: HttpClient,
  ) { }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Meal[]>('get meals', []))
      );
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
