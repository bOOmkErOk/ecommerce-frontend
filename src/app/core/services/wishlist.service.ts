import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'https://localhost:7236/api/wishlist';
  private graphqlUrl = 'https://localhost:7236/graphql';

  private favoriteIdsSubject = new BehaviorSubject<number[]>([]);
  favoriteIds$ = this.favoriteIdsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getMyWishlist(): Observable<any[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
        query {
          myWishlist {
            id
            product {
              id
              title
              price
              imageUrl
              discountPercent
              averageRating
              stock
            }
          }
        }
      `,
      })
      .pipe(
        map((response) => response.data.myWishlist),
        tap((items) => {
          const ids = items.map((i: any) => i.product.id);
          this.favoriteIdsSubject.next(ids);
        }),
      );
  }

  toggleWishlist(productId: number): Observable<any> {
  const currentIds = this.favoriteIdsSubject.value;
  const isCurrentlyFavorite = currentIds.includes(productId);
  
  const optimizedIds = isCurrentlyFavorite 
    ? currentIds.filter(id => id !== productId)
    : [...currentIds, productId];

  this.favoriteIdsSubject.next(optimizedIds);

  return this.http.post<any>(`${this.apiUrl}/toggle`, { productId }).pipe(
    tap({
      error: () => {
        this.favoriteIdsSubject.next(currentIds);
      }
    })
  );
}

  isFavorite(productId: number): boolean {
    return this.favoriteIdsSubject.value.includes(productId);
  }
}
