import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { WishlistItem } from '../../shared/models/wishlist,model';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { icons } from '../../shared/icons/icon';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard, CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist implements OnInit {
  trash: SafeHtml;
  wishlistItems: WishlistItem[] = [];
  isLoading = true;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private sanitizer: DomSanitizer,
  ) {
    this.trash = this.sanitizer.bypassSecurityTrustHtml(icons.trash);
  }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getMyWishlist().subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem(product.id, 1).subscribe({
      next: () => {
        console.log(`${product.title} added to cart`);
      },
      error: (err) => console.error('Failed to add to cart', err),
    });
  }

  moveAllToBag(): void {
    this.wishlistItems.forEach((item) => {
      this.onAddToCart(item.product);
    });
  }

  handleRemove(productId: number): void {
    this.wishlistService.toggleWishlist(productId).subscribe(() => {
      this.wishlistItems = this.wishlistItems.filter(
        (i) => i.product.id !== productId,
      );
    });
  }
}
