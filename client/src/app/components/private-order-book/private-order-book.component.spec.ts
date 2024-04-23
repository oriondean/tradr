import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOrderBookComponent } from './private-order-book.component';

describe('PrivateOrderBookComponent', () => {
  let component: PrivateOrderBookComponent;
  let fixture: ComponentFixture<PrivateOrderBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateOrderBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateOrderBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
