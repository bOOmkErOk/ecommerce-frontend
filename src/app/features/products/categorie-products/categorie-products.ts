import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-categorie-products',
  imports: [CommonModule, ProductCard],
  templateUrl: './categorie-products.html',
  styleUrl: './categorie-products.scss',
})
export class CategorieProducts implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  categoryTitle: string = '';
  filteredProducts: Product[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const type = params['type'];
      this.categoryTitle = type;
      this.loadCategoryProducts(type);
    });
  }

  loadCategoryProducts(type: string): void {
  this.isLoading = true;
  this.productService.getProductsByCategory(type).subscribe({
    next: (products) => {
      this.filteredProducts = products;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('GraphQL Error:', err);
      this.isLoading = false;
    }
  });
}

  handleAddToCart(product: Product): void {
    console.log('Product to be added to cart later:', product);
  }
}
