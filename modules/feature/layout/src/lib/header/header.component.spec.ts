import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const header: HTMLHeadingElement = fixture.nativeElement.querySelector('header');
    expect(header.textContent).toBe('Ecommerce');
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Ecommerce');
  });

});
