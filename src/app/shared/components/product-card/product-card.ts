import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Product } from '../../models/product.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';

import { icons } from '../../icons/icon';
import { WishlistState } from '../../../core/state/wishlist.state';
import { ToggleWishlist } from '../../../core/state/wishlist.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductCard implements OnInit {
@Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Input() isWishlistPage: boolean = false;

  isFavorite$!: Observable<boolean>;
  constructor(
    private router: Router,
    private store: Store,
    private sanitizer: DomSanitizer,
  ) {
    this.isFavorite$ = this.store
      .select(WishlistState.getItemIds)
      .pipe(map((ids) => ids.includes(this.product.id)));
  }

ngOnInit(): void {
    this.isFavorite$ = this.store
      .select(WishlistState.getItemIds)
      .pipe(map((ids) => ids.includes(this.product.id)));
  }
  getHeartIcon(isFav: boolean | null): SafeHtml {
    const icon = isFav ? icons.heartFilled : icons.heart;
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  onToggleWishlist(): void {
    this.store.dispatch(new ToggleWishlist(this.product.id));
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onCardClick(): void {
    this.router.navigate(['/products', this.product.id]);
  }

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getDiscountedPrice(): number {
    return (
      this.product.price -
      (this.product.price * this.product.discountPercent) / 100
    );
  }
}
