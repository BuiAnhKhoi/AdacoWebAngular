import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRODUCTSComponent } from './products.component';

describe('PRODUCTSComponent', () => {
  let component: PRODUCTSComponent;
  let fixture: ComponentFixture<PRODUCTSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PRODUCTSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PRODUCTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
