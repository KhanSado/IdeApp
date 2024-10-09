import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAnnouncementsComponent } from './public-announcements.component';

describe('PublicAnnouncementsComponent', () => {
  let component: PublicAnnouncementsComponent;
  let fixture: ComponentFixture<PublicAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicAnnouncementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
