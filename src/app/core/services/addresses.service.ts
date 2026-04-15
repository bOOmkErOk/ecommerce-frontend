import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private apiUrl = 'https://localhost:7236/api/addresses';

  constructor(private http: HttpClient) {}

  addAddress(streetAddress: string, apartment: string, city: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-address`, {
      streetAddress,
      apartment,
      city
    });
  }
}