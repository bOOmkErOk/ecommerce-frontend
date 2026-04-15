import { Component } from '@angular/core';
import { HeroSection } from "../hero/hero-section/hero-section";
import { SaleProducts } from "../../products/sale-products/sale-products/sale-products";
import { ProductList } from "../../products/product-list/product-list/product-list";
import { Categories } from "../categories/categories/categories";
import { BestSellingProducts } from "../../products/best-selling-products/best-selling-products/best-selling-products";
import { SponsoredProduct } from "../../products/sponsored-product/sponsored-product/sponsored-product";
import { NewArrival } from "../featured/new-arrival/new-arrival";
import { LittleInfo } from "../little-info/little-info";
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [HeroSection, SaleProducts, ProductList, Categories, BestSellingProducts, SponsoredProduct, NewArrival, LittleInfo],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
