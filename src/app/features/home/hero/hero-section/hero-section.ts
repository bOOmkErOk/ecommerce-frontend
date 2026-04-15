import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection implements AfterViewInit {
  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      modules: [Pagination],
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
