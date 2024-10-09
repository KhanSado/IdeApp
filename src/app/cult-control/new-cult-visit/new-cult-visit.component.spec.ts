import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCultVisitComponent } from './new-cult-visit.component';

describe('NewCultVisitComponent', () => {
  let component: NewCultVisitComponent;
  let fixture: ComponentFixture<NewCultVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCultVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCultVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
