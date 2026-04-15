import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7236/api/users';
  private graphqlUrl = 'https://localhost:7236/graphql';

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        me {
          id
          name
          email
          phoneNumber
          role
        }
      }
    `,
      })
      .pipe(
        map((response) => {
          console.log('Full response:', JSON.stringify(response));
          return response.data.me;
        }),
      );
  }
  changePassword(
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  }
  updateUser(
    name: string,
    email: string,
    phoneNumber: string,
    currentPassword?: string,
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, {
      name,
      email,
      phoneNumber,
      currentPassword,
    });
  }

verifyEmailChange(code: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/verify-email-change`, { code });
} 
}
