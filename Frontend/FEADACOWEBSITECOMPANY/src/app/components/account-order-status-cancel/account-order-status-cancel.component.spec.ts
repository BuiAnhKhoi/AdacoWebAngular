import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderStatusCancelComponent } from './account-order-status-cancel.component';

describe('AccountOrderStatusCancelComponent', () => {
  let component: AccountOrderStatusCancelComponent;
  let fixture: ComponentFixture<AccountOrderStatusCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderStatusCancelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderStatusCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
