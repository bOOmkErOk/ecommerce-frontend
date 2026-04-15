import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CartService } from '../../../../core/services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-best-selling-products',
  standalone: true,
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './best-selling-products.html',
  styleUrl: './best-selling-products.scss',
})
export class BestSellingProducts implements OnInit {
  products: Product[] = [];
  isLoading = true;
  error = '';

  constructor(private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getBestSellingProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
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
