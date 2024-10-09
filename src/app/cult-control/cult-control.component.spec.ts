import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultControlComponent } from './cult-control.component';

describe('CultControlComponent', () => {
  let component: CultControlComponent;
  let fixture: ComponentFixture<CultControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CultControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
