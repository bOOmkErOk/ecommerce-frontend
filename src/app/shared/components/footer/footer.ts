import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { icons } from '../../icons/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  send: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.send = this.sanitizer.bypassSecurityTrustHtml(icons.send);
  }
}
