import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountaddressComponent } from './myaccountaddress.component';

describe('MyaccountaddressComponent', () => {
  let component: MyaccountaddressComponent;
  let fixture: ComponentFixture<MyaccountaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyaccountaddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaccountaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
