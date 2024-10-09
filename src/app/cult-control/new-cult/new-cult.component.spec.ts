import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCultComponent } from './new-cult.component';

describe('NewCultComponent', () => {
  let component: NewCultComponent;
  let fixture: ComponentFixture<NewCultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
