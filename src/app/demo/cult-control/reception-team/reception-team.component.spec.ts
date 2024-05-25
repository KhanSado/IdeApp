import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionTeamComponent } from './reception-team.component';

describe('ReceptionTeamComponent', () => {
  let component: ReceptionTeamComponent;
  let fixture: ComponentFixture<ReceptionTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
