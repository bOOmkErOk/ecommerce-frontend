import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../../../shared/models/order.model';
import { OrdersService } from '../../../core/services/orders.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  processingId: number | null = null;

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  cancelOrder(orderId: number): void {
    if (this.processingId) return;

    this.processingId = orderId;
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.map((o) =>
          o.id === orderId ? { ...o, status: OrderStatus.Cancelled } : o,
        );
        this.processingId = null;
      },
      error: (err) => {
        console.error(err);
        this.processingId = null;
        alert('Could not cancel order. It may have already shipped.');
      },
    });
  }

  isPending(status: OrderStatus | string): boolean {
    return status === OrderStatus.Pending || status === 'Pending';
  }

  getItemPrice(product: any): number {
    if (!product) return 0;
    const basePrice = product.price || 0;
    const discount = product.discountPercent || 0;
    return basePrice - (basePrice * discount) / 100;
  }

  getOrderTotal(order: Order): number {
    if (!order || !order.orderItems) return 0;
    return order.orderItems.reduce((sum, item) => {
      return sum + this.getItemPrice(item.product) * item.quantity;
    }, 0);
  }
}
