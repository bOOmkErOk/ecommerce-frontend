import { Component } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-arrival',
  imports: [RouterLink],
  templateUrl: './new-arrival.html',
  styleUrl: './new-arrival.scss',
})
export class NewArrival {
newArrivals: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getNewArrivalProducts().subscribe({
      next: (products) => this.newArrivals = products
    });
  }
}
