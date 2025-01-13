import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from 'modules/data-access/product/src/lib/models/product.model';
import { RecommendedProductsService } from '@ecommerce-mentoria-angular/product-data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products$: Observable<Product[]>;

  constructor(private recommendedProductsService: RecommendedProductsService) {
    this.products$ = this.recommendedProductsService.getProducts();
  }
}
