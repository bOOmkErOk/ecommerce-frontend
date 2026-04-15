import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user.model';
import { ErrorMessage } from '../../shared/components/error-message/error-message';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink, ErrorMessage],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  user: User | null = null;
  isLoading = true;
  isSaving = false;
  error = '';
  success = '';

  name = '';
  email = '';
  phoneNumber = '';

  nameError = '';
  emailError = '';
  phoneError = '';
  passwordError = '';

  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordSuccess = '';
  isSavingPassword = false;

  showEmailVerification = false;
  currentPasswordForEmail = '';
  currentPasswordForEmailError = '';

  changePassword(): void {
    this.passwordError = '';
    this.isSavingPassword = true;

    this.userService
      .changePassword(
        this.currentPassword,
        this.newPassword,
        this.confirmNewPassword,
      )
      .subscribe({
        next: () => {
          this.passwordSuccess = 'Password changed successfully!';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
          this.isSavingPassword = false;
        },
        error: (err) => {
          this.passwordError =
            err.error?.message || 'Failed to change password';
          this.isSavingPassword = false;
        },
      });
  }
  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  saveChanges(): void {
    this.isSaving = true;
    this.error = '';
    this.success = '';
    this.nameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.currentPasswordForEmailError = '';

    if (this.email !== this.user?.email && !this.currentPasswordForEmail) {
      this.currentPasswordForEmailError =
        'Please enter your current password to change email';
      this.isSaving = false;
      return;
    }

    this.userService
      .updateUser(
        this.name,
        this.email,
        this.phoneNumber,
        this.email !== this.user?.email
          ? this.currentPasswordForEmail
          : undefined,
      )
      .subscribe({
        next: () => {
          if (this.email !== this.user?.email) {
            this.router.navigate(['/verify-email-change'], {
              queryParams: { email: this.email },
            });
          } else {
            this.success = 'Profile updated successfully!';
          }
          this.isSaving = false;
        },
        error: (err) => {
          const message = err.error?.message || 'Failed to update profile';
          if (message.toLowerCase().includes('email')) {
            this.emailError = message;
          } else if (message.toLowerCase().includes('password')) {
            this.currentPasswordForEmailError = message;
          } else {
            this.error = message;
          }
          this.isSaving = false;
        },
      }
    );
  }
}
