import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../../shared/components/product-card/product-card';

@Component({
  selector: 'app-full-product-list',
  imports: [CommonModule, ProductCard],
  templateUrl: './full-product-list.html',
  styleUrl: './full-product-list.scss',
})
export class FullProductList implements OnInit{
 products: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService,
     private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem(product.id, 1).subscribe();
  }
}
