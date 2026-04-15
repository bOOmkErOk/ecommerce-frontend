import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email-change',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-email-change.html',
  styleUrl: './verify-email-change.scss',
})
export class VerifyEmailChange implements OnInit {
  code = '';
  email = '';
  isLoading = false;
  error = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'] || '';
  }

  onSubmit(): void {
    this.isLoading = true;
    this.error = '';

    this.userService.verifyEmailChange(this.code).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid code';
        this.isLoading = false;
      }
    });
  }
}
