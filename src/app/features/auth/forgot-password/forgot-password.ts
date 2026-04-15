import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterLink, ErrorMessage],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  email = '';
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email.includes('@')) {
      this.error = 'Invalid email format';
      return;
    }
    this.isLoading = true;
    this.error = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.router.navigate(['/verify-reset-code'], {
          queryParams: { email: this.email }
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to send reset code';
        this.isLoading = false;
      }
    });
  }
}
