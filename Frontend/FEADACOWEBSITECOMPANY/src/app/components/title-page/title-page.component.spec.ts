import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TITLEPAGEComponent } from './title-page.component';

describe('TITLEPAGEComponent', () => {
  let component: TITLEPAGEComponent;
  let fixture: ComponentFixture<TITLEPAGEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TITLEPAGEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TITLEPAGEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
