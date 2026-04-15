import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../../../core/services/auth.service';
import { RegisterRequest } from './../../../../shared/models/auth.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../../../shared/icons/icon';
import { ErrorMessage } from '../../../../shared/components/error-message/error-message';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ErrorMessage,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  request: RegisterRequest = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  };
  showPassword = false;
  eye: SafeHtml;
  eyeOff: SafeHtml;
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.eye = this.sanitizer.bypassSecurityTrustHtml(icons.eye);
    this.eyeOff = this.sanitizer.bypassSecurityTrustHtml(icons.eyeOff);
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    this.error = '';
    if (!this.request.name.trim()) {
      this.error = 'Name is required';
      return;
    }
    if (!this.request.email.includes('@')) {
      this.error = 'Invalid email format';
      return;
    }
    if (this.request.password.length < 8) {
      this.error = 'Password must be at least 8 characters';
      return;
    }
    if (!this.request.phoneNumber.trim()) {
      this.error = 'Phone number is required';
      return;
    }
     this.isLoading = true;
    this.authService.register(this.request).subscribe({
      next: () => {
        this.router.navigate(['/verify-email'], {
          queryParams: { email: this.request.email },
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed';
        this.isLoading = false;
      },
    });
  }
}
