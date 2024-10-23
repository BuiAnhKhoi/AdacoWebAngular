import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderHistoryComponent } from './account-order-history.component';

describe('AccountOrderHistoryComponent', () => {
  let component: AccountOrderHistoryComponent;
  let fixture: ComponentFixture<AccountOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountOrderHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
