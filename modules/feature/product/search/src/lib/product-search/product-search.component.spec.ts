import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductSearchComponent } from './product-search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  productMock,
  ProductSearchService,
} from '@ecommerce-mentoria-angular/product-data-access';
import { of } from 'rxjs';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productSearchService: ProductSearchService;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent, NoopAnimationsModule],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductSearchService,
          useValue: {
            searchByName: () => {
              return {
                searchByName: jest.fn().mockReturnValue(of(productMock)),
              };
            },
          },
        },
      ],
    }).compileComponents();
    productSearchService = TestBed.inject(ProductSearchService);
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  function simulateInput(value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce when input field is changed', fakeAsync(() => {
    jest
      .spyOn(productSearchService, 'searchByName')
      .mockReturnValue(of(productMock));

    simulateInput('tv');

    expect(productSearchService.searchByName).not.toHaveBeenCalled();

    tick(500); // debounce time

    expect(productSearchService.searchByName).toHaveBeenCalledWith(input.value);
  }));

  it('should search multiple times', fakeAsync(() => {
    jest
      .spyOn(productSearchService, 'searchByName')
      .mockReturnValue(of(productMock)); // Verifique se o mock está correto

    simulateInput('tv');

    tick(500); // Tempo para debounce

    simulateInput('phone');

    tick(500); // Tempo para debounce

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(2);
  }));

  it('should prevent identical submissions', fakeAsync(() => {
    jest
      .spyOn(productSearchService, 'searchByName')
      .mockReturnValue(of(productMock));

    simulateInput('tv');

    tick(500); // Tempo para debounce

    simulateInput('tv');

    tick(500); // Tempo para debounce

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(1);
  }));

  it('should prevent empty submissions', fakeAsync(() => {
    jest
      .spyOn(productSearchService, 'searchByName')
      .mockReturnValue(of(productMock));

    simulateInput('');

    tick(500); // Tempo para debounce

    expect(productSearchService.searchByName).not.toHaveBeenCalled();
  }));

  it('should return products observable correctly', () => {
    const products = component.products$;
    expect(products).toBeTruthy();
    component.products$.subscribe((result) => {
      expect(result).toEqual(productMock);
    });
  });
});
