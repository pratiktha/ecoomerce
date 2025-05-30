import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentconfirmationComponent } from './paymentconfirmation.component';

describe('PaymentconfirmationComponent', () => {
  let component: PaymentconfirmationComponent;
  let fixture: ComponentFixture<PaymentconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentconfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
