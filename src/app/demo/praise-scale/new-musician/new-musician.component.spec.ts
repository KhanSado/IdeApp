import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMusicianComponent } from './new-musician.component';

describe('NewMusicianComponent', () => {
  let component: NewMusicianComponent;
  let fixture: ComponentFixture<NewMusicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMusicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMusicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
