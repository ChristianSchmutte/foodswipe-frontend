import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../checkout/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  openOrders?: Order[];
  pendingOrders?: Order[];

  openOrderSubscription?: Subscription;
  pendingOrderSubscription?: Subscription;

  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.openOrderSubscription = this.ordersService.openOrders$
      .subscribe(openOrders => this.openOrders = openOrders);
    this.pendingOrderSubscription = this.ordersService.pendingOrders$
      .subscribe(pendingOrders => {
        console.log(pendingOrders);
      });
  }
  

}
