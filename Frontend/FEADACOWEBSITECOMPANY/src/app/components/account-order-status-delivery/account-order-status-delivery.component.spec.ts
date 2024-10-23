import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderStatusDeliveryComponent } from './account-order-status-delivery.component';

describe('AccountOrderStatusDeliveryComponent', () => {
  let component: AccountOrderStatusDeliveryComponent;
  let fixture: ComponentFixture<AccountOrderStatusDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderStatusDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderStatusDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
