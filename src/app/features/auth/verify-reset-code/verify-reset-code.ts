import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-reset-code',
  imports: [CommonModule, FormsModule, ErrorMessage],
  templateUrl: './verify-reset-code.html',
  styleUrl: './verify-reset-code.scss',
})
export class VerifyResetCode {
 code = '';
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
    if (!this.code) {
      this.error = 'Code is required';
      return;
    }
    this.isLoading = true;
    this.error = '';

    this.authService.verifyResetCode(this.email, this.code).subscribe({
      next: () => {
        this.router.navigate(['/reset-password'], {
          queryParams: { email: this.email }
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid code';
        this.isLoading = false;
      }
    });
  }
}
