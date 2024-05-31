import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstrumentComponent } from './new-instrument.component';

describe('NewInstrumentComponent', () => {
  let component: NewInstrumentComponent;
  let fixture: ComponentFixture<NewInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInstrumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
