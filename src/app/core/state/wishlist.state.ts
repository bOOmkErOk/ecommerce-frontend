import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadWishlist, ToggleWishlist } from './wishlist.actions';
import { WishlistService } from '../services/wishlist.service';
import { tap, catchError } from 'rxjs/operators';

export interface WishlistStateModel {
  itemIds: number[];
}

@State<WishlistStateModel>({
  name: 'wishlist',
  defaults: { itemIds: [] }
})
@Injectable()
export class WishlistState {
  constructor(private wishlistService: WishlistService) {}

  @Selector()
  static getItemIds(state: WishlistStateModel) {
    return state.itemIds;
  }
  
@Action(LoadWishlist)
load(ctx: StateContext<WishlistStateModel>) {
  return this.wishlistService.getMyWishlist().pipe(
    tap((items: any[]) => {
      const ids = items.map(item => item.product.id);
      ctx.patchState({ itemIds: ids });
    }),
    catchError((err) => {
      console.error('Could not load wishlist from server', err);
      throw err;
    })
  );
}

  @Action(ToggleWishlist)
  toggle(ctx: StateContext<WishlistStateModel>, action: ToggleWishlist) {
    const state = ctx.getState();
    const isFav = state.itemIds.includes(action.productId);

    if (isFav) {
      ctx.patchState({ itemIds: state.itemIds.filter(id => id !== action.productId) });
    } else {
      ctx.patchState({ itemIds: [...state.itemIds, action.productId] });
    }

    return this.wishlistService.toggleWishlist(action.productId).pipe(
      catchError((err) => {
        ctx.patchState({ itemIds: state.itemIds });
        throw err;
      })
    );
  }
}