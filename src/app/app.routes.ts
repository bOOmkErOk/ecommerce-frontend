import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { CategorieProducts } from './features/products/categorie-products/categorie-products';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home/home').then((h) => h.Home),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list/product-list').then(
        (m) => m.ProductList,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-detail/product-detail').then(
        (m) => m.ProductDetail,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login/login').then((m) => m.Login),
  },
  {
    path: 'verify-email-change',
    loadComponent: () =>
      import('./features/auth/verify-email-change/verify-email-change').then(
        (m) => m.VerifyEmailChange,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register/register').then(
        (m) => m.Register,
      ),
  },
  {
    path: 'verify-email',
    loadComponent: () =>
      import('./features/auth/verify-email/verify-email').then(
        (m) => m.VerifyEmail,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./shared/components/product-card/product-card').then(
        (m) => m.ProductCard,
      ),
    canActivate: [authGuard],
  },
  {
path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist').then((m) => m.Wishlist),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart-page/cart-page').then((m) => m.CartPage),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile').then((m) => m.Profile),
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout').then((m) => m.Checkout),
    canActivate: [authGuard],
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then((m) => m.Contact),
    canActivate: [authGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about/about').then((m) => m.About),
    canActivate: [authGuard],
  },
  {
    path: 'all-products',
    loadComponent: () =>
      import('./features/products/product-list/full-product-list/full-product-list').then(
        (m) => m.FullProductList,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'all-sale-products',
    loadComponent: () =>
      import('./features/products/sale-products/all-sale-products/all-sale-products').then(
        (m) => m.AllSaleProducts,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'all-best-selling',
    loadComponent: () =>
      import('./features/products/best-selling-products/all-best-selling-products/all-best-selling-products').then(
        (m) => m.AllBestSellingProducts,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/orders-page/orders-page').then(
        (m) => m.OrdersPage,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'cancelled-orders',
    loadComponent: () =>
      import('./features/orders/cancelled-orders/cancelled-orders').then(
        (m) => m.CancelledOrders,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password').then(
        (m) => m.ForgotPassword,
      ),
  },
  {
    path: 'verify-reset-code',
    loadComponent: () =>
      import('./features/auth/verify-reset-code/verify-reset-code').then(
        (m) => m.VerifyResetCode,
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/auth/reset-password/reset-password').then(
        (m) => m.ResetPassword,
      ),
  },
  { path: 'category/:type', component: CategorieProducts }
];
