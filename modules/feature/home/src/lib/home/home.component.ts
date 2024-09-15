import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from 'modules/data-access/product/src/lib/models/product.model';
import { productMock } from '@ecommerce-mentoria-angular/product-data-access';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = productMock;
}
