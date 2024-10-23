import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocietyMinisteryComponent } from './add-society-ministery.component';

describe('AddSocietyMinisteryComponent', () => {
  let component: AddSocietyMinisteryComponent;
  let fixture: ComponentFixture<AddSocietyMinisteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSocietyMinisteryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSocietyMinisteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
