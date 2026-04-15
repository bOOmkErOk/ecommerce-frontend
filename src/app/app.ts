import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { Footer } from "./shared/components/footer/footer";
import { filter } from 'rxjs';
import { WishlistService } from './core/services/wishlist.service';
import { LoadWishlist } from './core/state/wishlist.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('E-Commerce-Front');
  hideLayout = false;

  private hiddenRoutes = ['/login', '/register', '/forgot-password', '/verify-reset-code', '/reset-password', '/verify-email', '/verify-email-change'];


  constructor(
    private router: Router, 
    private store: Store
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.hideLayout = this.hiddenRoutes.some(route =>
        e.urlAfterRedirects.startsWith(route)
      );
    });
  }
  
  ngOnInit(): void {
    this.store.dispatch(new LoadWishlist());
  }
}
