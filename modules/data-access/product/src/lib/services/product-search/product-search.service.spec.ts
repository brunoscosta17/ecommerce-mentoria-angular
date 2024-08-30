import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http'; // Adicione esta linha
import { ProductSearchService } from './product-search.service';
import { Product } from '../../models/product.model';
import { productMock } from '../../mocks/product.mock';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Providencia o HttpClient
        provideHttpClientTesting(), // Providencia as funcionalidades de teste para o HttpClient
        ProductSearchService, // Providencia o serviço que será testado
      ],
    });

    service = TestBed.inject(ProductSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se todas as solicitações HTTP foram feitas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products correctly', () => {
    // Arrange
    const mockName = 'notebook';
    const url = `${service.apiUrl}/products?name=${mockName}`;
    let result: Product[] = [];

    // Act
    service.searchByName(mockName).subscribe((products) => (result = products));

    // Assert
    const request = httpMock.expectOne(url);
    request.flush(productMock);
    expect(request.request.method).toBe('GET');
    expect(result).toEqual(productMock);
  });
});
