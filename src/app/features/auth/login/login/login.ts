import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../../../shared/models/auth.model';
import { AuthService } from '../../../../core/services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../../../shared/icons/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  request: LoginRequest = {
    email: '',
    password: '',
  };

  eye: SafeHtml;
  eyeOff: SafeHtml;
  showPassword = false;
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
    this.isLoading = true;
    this.error = '';

    this.authService.login(this.request).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error?.message || 'Login failed';

        if (errorMessage.toLowerCase().includes('verify') || errorMessage.includes('EmailNotVerified')) {
          
          this.router.navigate(['/verify-email'], { 
            queryParams: { email: this.request.email } 
          });

        } else {
          this.error = errorMessage;
        }
      },
    });
  }
}
