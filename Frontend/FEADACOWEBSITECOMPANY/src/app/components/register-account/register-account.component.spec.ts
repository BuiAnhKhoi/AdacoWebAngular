import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REGISTERACCOUNTComponent } from './register-account.component';

describe('REGISTERACCOUNTComponent', () => {
  let component: REGISTERACCOUNTComponent;
  let fixture: ComponentFixture<REGISTERACCOUNTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [REGISTERACCOUNTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(REGISTERACCOUNTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
