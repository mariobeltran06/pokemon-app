import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProfileCoachComponent } from './generate-profile-coach.component';

describe('GenerateProfileCoachComponent', () => {
  let component: GenerateProfileCoachComponent;
  let fixture: ComponentFixture<GenerateProfileCoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GenerateProfileCoachComponent]
    });
    fixture = TestBed.createComponent(GenerateProfileCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
