import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../icons/icon';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  user: SafeHtml;
  cart: SafeHtml;
  orders: SafeHtml;
  heart: SafeHtml;
  star: SafeHtml;
  search: SafeHtml;
  logoutIcon: SafeHtml;

  mobileMenuOpen = false;
  dropdownOpen = false;
  searchQuery = '';
  searchResults: Product[] = [];
  showResults = false;
  private searchTimeout: any;

  constructor(
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private router: Router,
  ) {
    this.user = this.sanitizer.bypassSecurityTrustHtml(icons.user);
    this.cart = this.sanitizer.bypassSecurityTrustHtml(icons.cart);
    this.orders = this.sanitizer.bypassSecurityTrustHtml(icons.orders);
    this.star = this.sanitizer.bypassSecurityTrustHtml(icons.star);
    this.logoutIcon = this.sanitizer.bypassSecurityTrustHtml(icons.logout);
    this.heart = this.sanitizer.bypassSecurityTrustHtml(icons.heart);
    this.search = this.sanitizer.bypassSecurityTrustHtml(icons.search);

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
  }

  onSearch(): void {
    clearTimeout(this.searchTimeout);
    if (this.searchQuery.trim().length < 2) {
      this.searchResults = [];
      this.showResults = false;
      return;
    }
    this.searchTimeout = setTimeout(() => {
      this.productService.searchProducts(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results;
          this.showResults = true;
        },
      });
    }, 300);
  }

  goToProduct(productId: number): void {
    this.showResults = false;
    this.searchQuery = '';
    this.router.navigate(['/products', productId]);
  }

  getDiscountedPrice(product: Product): number {
    return product.price - (product.price * product.discountPercent) / 100;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-wrapper')) {
      this.showResults = false;
    }
  }
}
