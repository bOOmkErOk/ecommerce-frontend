import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-all-sale-products',
  imports: [CommonModule, ProductCard],
  templateUrl: './all-sale-products.html',
  styleUrl: './all-sale-products.scss',
})
export class AllSaleProducts implements OnInit {
 products: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAllSaleProducts().subscribe({
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
