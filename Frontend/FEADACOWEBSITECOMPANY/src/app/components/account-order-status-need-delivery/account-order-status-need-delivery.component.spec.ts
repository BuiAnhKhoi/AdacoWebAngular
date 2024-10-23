import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderStatusNeedDeliveryComponent } from './account-order-status-need-delivery.component';

describe('AccountOrderStatusNeedDeliveryComponent', () => {
  let component: AccountOrderStatusNeedDeliveryComponent;
  let fixture: ComponentFixture<AccountOrderStatusNeedDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderStatusNeedDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderStatusNeedDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
