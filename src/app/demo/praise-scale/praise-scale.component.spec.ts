import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraiseScaleComponent } from './praise-scale.component';

describe('PraiseScaleComponent', () => {
  let component: PraiseScaleComponent;
  let fixture: ComponentFixture<PraiseScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraiseScaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PraiseScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
