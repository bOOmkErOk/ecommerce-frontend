import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/cart.model';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  cart: Cart | null = null;
  isLoading = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getMyCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getSubtotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((sum, item) => {
      return sum + (this.getItemPrice(item.product) * item.quantity);
    }, 0);
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeItem(cartItemId).subscribe({
      next: () => this.loadCart()
    });
  }
  
  getItemPrice(product: any): number {
    return product.price - (product.price * product.discountPercent / 100);
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) return;
    this.cartService.updateQuantity(itemId, quantity).subscribe({
      next: () => this.loadCart()
    });
  }

}
