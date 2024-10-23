import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderStatusReturnComponent } from './account-order-status-return.component';

describe('AccountOrderStatusReturnComponent', () => {
  let component: AccountOrderStatusReturnComponent;
  let fixture: ComponentFixture<AccountOrderStatusReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderStatusReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderStatusReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
