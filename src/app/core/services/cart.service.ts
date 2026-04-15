import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7236/api/cart';
  private graphqlUrl = 'https://localhost:7236/graphql';

  constructor(private http: HttpClient) {}

  getMyCart(): Observable<Cart> {
    return this.http.post<any>(this.graphqlUrl, {
      query: `
        query {
          myCart {
            id
            items {
              id
              quantity
              product {
                id
                title
                price
                imageUrl
                discountPercent
              }
            }
          }
        }
      `
    }).pipe(
      map(response => response.data.myCart)
    );
  }

  addItem(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-item`, { productId, quantity });
  }

  removeItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-product`, { body: { cartItemId } });
  }

  updateQuantity(itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-quantity`, { itemId, quantity });
  }
  createOrder(): Observable<any> {
  return this.http.post(`${this.apiUrl.replace('cart', 'orders')}/create-order`, {});
}
}