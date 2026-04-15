import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { icons } from '../../../shared/icons/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-little-info',
  imports: [CommonModule],
  templateUrl: './little-info.html',
  styleUrl: './little-info.scss',
})
export class LittleInfo {
 delivery: SafeHtml;
service: SafeHtml;
secure: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {
    this.delivery = this.sanitizer.bypassSecurityTrustHtml(icons.delivery);
    this.service = this.sanitizer.bypassSecurityTrustHtml(icons.service);
    this.secure = this.sanitizer.bypassSecurityTrustHtml(icons.secure);

  }
}
