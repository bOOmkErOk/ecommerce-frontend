import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/models/product.model';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CartService } from '../../../../core/services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  isLoading = true;
  error = '';

  constructor(private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
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
onAddToCart(product: Product): void {
  this.cartService.addItem(product.id, 1).subscribe({
    next: () => console.log('Added to cart!'),
    error: (err) => console.error(err)
  });
}
}
