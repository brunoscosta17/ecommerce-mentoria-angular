import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  productsMock,
  RecommendedProductsService,
} from '@ecommerce-mentoria-angular/product-data-access';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HomeComponent],
      providers: [
        provideHttpClient(),
        {
          provide: RecommendedProductsService,
          useValue: {
            getProducts: () => of(productsMock),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product cards correctly', () => {
    // Arrange
    const productCards: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.product-card');

    // Assert
    expect(productCards.length).toBe(productsMock.length);
  });
});
