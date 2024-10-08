import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchService {
  readonly apiUrl = 'https://65009f9718c34dee0cd53786.mockapi.io/';

  constructor(private _http: HttpClient) {}

  searchByName(name: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { name },
    });
  }
}
