import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NppComponent } from './npp.component';

describe('NppComponent', () => {
  let component: NppComponent;
  let fixture: ComponentFixture<NppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
