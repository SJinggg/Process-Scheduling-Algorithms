import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsjfComponent } from './psjf.component';

describe('PsjfComponent', () => {
  let component: PsjfComponent;
  let fixture: ComponentFixture<PsjfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsjfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsjfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
