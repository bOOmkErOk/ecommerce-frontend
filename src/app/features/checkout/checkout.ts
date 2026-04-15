import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { AddressesService } from '../../core/services/addresses.service';
import { Router } from '@angular/router';
import { Cart } from '../../shared/models/cart.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
  cart: Cart | null = null;
  isLoading = true;
  isPlacingOrder = false;
  saveInfo = false;
  streetAddress = '';
  apartment = '';
  city = '';

  constructor(
    private cartService: CartService,
    private addressService: AddressesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.getMyCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  getItemPrice(product: any): number {
    return product.price - (product.price * product.discountPercent / 100);
  }

  getSubtotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((sum, item) => {
      return sum + (this.getItemPrice(item.product) * item.quantity);
    }, 0);
  }

  placeOrder(): void {
    if (!this.streetAddress || !this.city) return;
    this.isPlacingOrder = true;

    this.addressService.addAddress(this.streetAddress, this.apartment, this.city).subscribe({
      next: () => {
        this.cartService.createOrder().subscribe({
          next: () => {
            this.router.navigate(['/orders']);
          },
          error: () => this.isPlacingOrder = false
        });
      },
      error: () => this.isPlacingOrder = false
    });
  }
}
