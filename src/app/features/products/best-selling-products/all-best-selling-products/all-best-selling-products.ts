import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { ProductCard } from '../../../../shared/components/product-card/product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-best-selling-products',
  imports: [CommonModule, ProductCard],
  templateUrl: './all-best-selling-products.html',
  styleUrl: './all-best-selling-products.scss',
})
export class AllBestSellingProducts implements OnInit{
 products: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAllBestSellingProducts().subscribe({
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
