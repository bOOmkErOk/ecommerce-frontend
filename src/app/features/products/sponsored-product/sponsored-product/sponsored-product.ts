import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sponsored-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sponsored-product.html',
  styleUrl: './sponsored-product.scss',
})
export class SponsoredProduct implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  private interval: any;
  sponsoredProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getSponsoredProduct().subscribe({
      next: (product) => {
        this.sponsoredProduct = product;
        if (product?.sponsoredUntil) {
          this.calculateTimeLeft(new Date(product.sponsoredUntil));
        }
      },
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  calculateTimeLeft(endDate: Date): void {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }

  tick(): void {
    if (this.seconds > 0) {
      this.seconds--;
    } else if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    } else if (this.hours > 0) {
      this.hours--;
      this.minutes = 59;
      this.seconds = 59;
    } else if (this.days > 0) {
      this.days--;
      this.hours = 23;
      this.minutes = 59;
      this.seconds = 59;
    }
  }
}
