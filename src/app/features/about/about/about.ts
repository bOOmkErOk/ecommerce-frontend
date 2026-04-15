import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../../shared/icons/icon';
import { LittleInfo } from "../../home/little-info/little-info";
import { Pagination } from 'swiper/modules';
import Swiper from 'swiper';


@Component({
  selector: 'app-about',
  imports: [CommonModule, LittleInfo],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  shop: SafeHtml;
  sale: SafeHtml;
  shoppingbag: SafeHtml;
  moneybag: SafeHtml;
  twitter: SafeHtml;
  instagram: SafeHtml;
  linkedin: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.shop = this.sanitizer.bypassSecurityTrustHtml(icons.shop);
    this.sale = this.sanitizer.bypassSecurityTrustHtml(icons.sale);
    this.shoppingbag = this.sanitizer.bypassSecurityTrustHtml(icons.shoppingbag);
    this.moneybag = this.sanitizer.bypassSecurityTrustHtml(icons.moneybag);
    this.twitter = this.sanitizer.bypassSecurityTrustHtml(icons.twitter);
    this.instagram = this.sanitizer.bypassSecurityTrustHtml(icons.instagram);
    this.linkedin = this.sanitizer.bypassSecurityTrustHtml(icons.linkedin);

  }

   ngAfterViewInit(): void {
  const swiper = new Swiper('.mySwiper', {
    modules: [Pagination],
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      968: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });
}
}
