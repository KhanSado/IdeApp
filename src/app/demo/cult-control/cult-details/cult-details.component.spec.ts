import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultDetailsComponent } from './cult-details.component';

describe('CultDetailsComponent', () => {
  let component: CultDetailsComponent;
  let fixture: ComponentFixture<CultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
