import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { Order } from '../../../shared/models/order.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cancelled-orders',
  imports: [CommonModule, RouterLink],
  templateUrl: './cancelled-orders.html',
  styleUrl: './cancelled-orders.scss',
})
export class CancelledOrders implements OnInit {
orders: Order[] = [];
  isLoading = true;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getCancelledOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  getItemPrice(product: any): number {
    if (!product) return 0;
    const basePrice = product.price || 0;
    const discount = product.discountPercent || 0;
    return basePrice - (basePrice * discount / 100);
  }

  getOrderTotal(order: Order): number {
    if (!order || !order.orderItems) return 0;
    return order.orderItems.reduce((sum, item) => {
      return sum + (this.getItemPrice(item.product) * item.quantity);
    }, 0);
  }
}
