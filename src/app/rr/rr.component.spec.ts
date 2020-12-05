import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrComponent } from './rr.component';

describe('RrComponent', () => {
  let component: RrComponent;
  let fixture: ComponentFixture<RrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
