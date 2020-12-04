import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsjfComponent } from './npsjf.component';

describe('NpsjfComponent', () => {
  let component: NpsjfComponent;
  let fixture: ComponentFixture<NpsjfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpsjfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsjfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
