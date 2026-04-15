import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../../shared/icons/icon';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ErrorMessage, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  isLoading = true;
  quantity = 1;
  selectedImage = '';
  delivery: SafeHtml;
  return: SafeHtml;
  hasBought = false;
  hasRated = false;
  selectedRating = 0;
  ratingSuccess = '';
  ratingError = '';
  stockWarning = '';
  addToCartError = '';
hoveredRating = 0;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private sanitizer: DomSanitizer,
  ) {
    this.delivery = this.sanitizer.bypassSecurityTrustHtml(icons.delivery);
    this.return = this.sanitizer.bypassSecurityTrustHtml(icons.return);
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedImage = product.imageUrl;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });

    this.productService.hasUserBoughtProduct(id).subscribe({
      next: (hasBought) => (this.hasBought = hasBought),
    });
  }

  getDiscountedPrice(): number {
    if (!this.product) return 0;
    return (
      this.product.price -
      (this.product.price * this.product.discountPercent) / 100
    );
  }

  increaseQuantity(): void {
    if (!this.product) return;
    if (this.quantity >= this.product.stock) {
      this.stockWarning = 'Maximum available stock reached!';
      return;
    }
    this.stockWarning = '';
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

 addToCart(): void {
  if (!this.product) return;
  this.addToCartError = '';
  
  this.cartService.addItem(this.product.id, this.quantity).subscribe({
    next: () => alert('Added to cart!'),
    error: (err) => {
      this.addToCartError = err.error?.message || 'Failed to add to cart';
    }
  });
}

  setRating(star: number): void {
    this.selectedRating = star;
  }

  submitRating(): void {
    if (!this.product || this.selectedRating === 0) return;
    this.productService
      .rateProduct(this.product.id, this.selectedRating)
      .subscribe({
        next: () => {
          this.ratingSuccess = 'Thank you for your rating!';
          this.hasRated = true;
          this.ratingError = '';
        },
        error: (err) => {
          this.ratingError = err.error?.message || 'Failed to submit rating';
        },
      });
  }
  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
