import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderStatusSuccessComponent } from './account-order-status-success.component';

describe('AccountOrderStatusSuccessComponent', () => {
  let component: AccountOrderStatusSuccessComponent;
  let fixture: ComponentFixture<AccountOrderStatusSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderStatusSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderStatusSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
