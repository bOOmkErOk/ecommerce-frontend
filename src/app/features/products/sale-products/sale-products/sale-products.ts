import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CartService } from '../../../../core/services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sale-products',
  standalone: true,
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './sale-products.html',
  styleUrl: './sale-products.scss',
})
export class SaleProducts implements OnInit {
  saleProducts: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getSaleProducts().subscribe({
      next: (products) => {
        this.saleProducts = products;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getDiscountedPrice(product: Product): number {
    return product.price - (product.price * product.discountPercent / 100);
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem(product.id, 1).subscribe({
      next: () => console.log('Added to cart!'),
      error: (err) => console.error(err)
    });
  }
}
