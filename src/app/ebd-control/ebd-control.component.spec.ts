import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbdControlComponent } from './ebd-control.component';

describe('EbdControlComponent', () => {
  let component: EbdControlComponent;
  let fixture: ComponentFixture<EbdControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbdControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EbdControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
