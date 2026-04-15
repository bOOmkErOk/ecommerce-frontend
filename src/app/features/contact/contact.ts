import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../shared/icons/icon';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  emaillogo: SafeHtml;
  homephone: SafeHtml;



constructor(private sanitizer: DomSanitizer) {
    this.emaillogo = this.sanitizer.bypassSecurityTrustHtml(icons.email);
    this.homephone = this.sanitizer.bypassSecurityTrustHtml(icons.homephone);

  }

  name = '';
  email = '';
  phone = '';
  message = '';

  onSubmit(): void {
    console.log('Message sent!');
  }
}
