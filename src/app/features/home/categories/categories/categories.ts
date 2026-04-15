import { Component } from '@angular/core';
import { icons } from '../../../../shared/icons/icon';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
 phone: SafeHtml;
computer: SafeHtml;
smartwatch: SafeHtml;
camera: SafeHtml;
headphones: SafeHtml;
gaming: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.phone = this.sanitizer.bypassSecurityTrustHtml(icons.phone);
    this.computer = this.sanitizer.bypassSecurityTrustHtml(icons.computer);
    this.smartwatch = this.sanitizer.bypassSecurityTrustHtml(icons.smartwatch);
    this.camera = this.sanitizer.bypassSecurityTrustHtml(icons.camera);
    this.headphones = this.sanitizer.bypassSecurityTrustHtml(icons.headphones);
    this.gaming = this.sanitizer.bypassSecurityTrustHtml(icons.gaming);
  }
}
