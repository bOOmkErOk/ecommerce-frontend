import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterLink, ErrorMessage],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  newPassword = '';
  confirmPassword = '';
  email = '';
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'] || '';
  }

  onSubmit(): void {
    if (this.newPassword.length < 8) {
      this.error = 'Password must be at least 8 characters';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.isLoading = true;
    this.error = '';

    this.authService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to reset password';
        this.isLoading = false;
      }
    });
  }
}
