import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderStatusPendingComponent } from './account-order-status-pending.component';

describe('AccountOrderStatusPendingComponent', () => {
  let component: AccountOrderStatusPendingComponent;
  let fixture: ComponentFixture<AccountOrderStatusPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderStatusPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderStatusPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
