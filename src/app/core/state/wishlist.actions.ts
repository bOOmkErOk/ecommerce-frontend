export class ToggleWishlist {
  static readonly type = '[Wishlist] Toggle';
  constructor(public productId: number) {}
}

export class LoadWishlist {
  static readonly type = '[Wishlist] Load';
}