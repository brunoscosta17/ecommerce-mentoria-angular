import { ComponentFixture, TestBed } from '@angular/core/testing';
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
                subscribe: () => of(productMock),
              };
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
