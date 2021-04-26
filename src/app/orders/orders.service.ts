import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Order } from '../checkout/order.interface';
import { AuthService } from '../login/auth.service';
import { Restaurant } from '../meals/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnDestroy {

  private baseUrl = 'http://localhost:8080/orders?restaurantId='
  private stopPolling = new Subject();
  openOrders$ = new BehaviorSubject<Order[]>([]);

  // Polling mechanism
  pendingOrders$: Observable<Order[]>;
  restaurant: Restaurant;

  private httpOptions = {
    headers: { 'Content-Type' : 'application/json '}
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.restaurant = this.authService.restaurant$.getValue();
    this.pendingOrders$ = timer(1, 3000).pipe(
      switchMap(() => this.getPendingOrders()), // Transforms timer to observable Order[]
      tap((res) =>{
        console.log(res);
        console.log('RESTAURANT', this.restaurant);
      }),
      retry(), // ensures failed attempts do not cancel timer
      share(), // ensures all subs share the same timer
      takeUntil(this.stopPolling) // to destroy timer
    );
  }

  
  ngOnDestroy(): void {
    // prevent timer leaking
    this.stopPolling.next();
  }

  getOpenOrders(): void {
    const newOrders = this.http.get<Order[]>(`${this.baseUrl}${this.restaurant.id}`);
    newOrders.subscribe(orders => this.openOrders$.next(orders));
  }

  private getPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}${this.restaurant.id}&status=PENDING`);
  }

  acceptOrder(id: number) {
    this.http.patch<Order>(`${this.baseUrl}&status=ACCEPTED&id=${id}`, null)
      .subscribe((order) => {
        if (order.id === id) {
          this.getOpenOrders();
        }
      });
  }
}
