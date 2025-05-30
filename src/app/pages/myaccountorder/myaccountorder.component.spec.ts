import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountorderComponent } from './myaccountorder.component';

describe('MyaccountorderComponent', () => {
  let component: MyaccountorderComponent;
  let fixture: ComponentFixture<MyaccountorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyaccountorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaccountorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
