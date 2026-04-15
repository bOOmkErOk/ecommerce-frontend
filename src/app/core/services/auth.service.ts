import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7236/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('name', response.name);
      }),
    );
  }

  verifyEmail(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, { email, code });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0');
  }

  getCurrentUserName(): string {
    return localStorage.getItem('name') || '';
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  verifyResetCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-reset-code`, { email, code });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email,
      newPassword,
    });
  }
}
