import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassroomComponent } from './new-classroom.component';

describe('NewClassroomComponent', () => {
  let component: NewClassroomComponent;
  let fixture: ComponentFixture<NewClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClassroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
