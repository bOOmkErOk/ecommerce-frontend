import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { Order } from "../../shared/models/order.model";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private apiUrl = 'https://localhost:7236/api/orders';
    private graphqlUrl = 'https://localhost:7236/graphql';

    constructor(private http: HttpClient) { }

    getMyOrders(): Observable<Order[]> {
    return this.http.post<any>(this.graphqlUrl, {
      query: `
        query {
          myOrders {
            id
            createdAt
            status
            orderItems {
              id
              quantity
              price
              product {
                title
                imageUrl
                price
                discountPercent
              }
            }
          }
        }
      `
    }).pipe(
      map(response => response.data.myOrders)
    );
  }


  getCancelledOrders(): Observable<Order[]> {
        return this.http.post<any>(this.graphqlUrl, {
            query: `
        query {
          cancelledOrders {
            id
            createdAt
            status
            orderItems {
              id
              quantity
              price
              product {
                title
                imageUrl
                price
                discountPercent
              }
            }
          }
        }
      `
        }).pipe(
            map(response => response.data.cancelledOrders)
        );
    }

   cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel-order`, { orderId });
  }
  
}