import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrderByCodeComponent } from './search-order-by-code.component';

describe('SearchOrderByCodeComponent', () => {
  let component: SearchOrderByCodeComponent;
  let fixture: ComponentFixture<SearchOrderByCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchOrderByCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchOrderByCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
