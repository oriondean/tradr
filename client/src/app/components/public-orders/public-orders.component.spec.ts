import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOrdersComponent } from './public-orders.component';

describe('PublicOrdersComponent', () => {
  let component: PublicOrdersComponent;
  let fixture: ComponentFixture<PublicOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
