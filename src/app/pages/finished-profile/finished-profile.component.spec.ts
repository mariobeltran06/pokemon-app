import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProfileComponent } from './finished-profile.component';

describe('FinishedProfileComponent', () => {
  let component: FinishedProfileComponent;
  let fixture: ComponentFixture<FinishedProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FinishedProfileComponent]
    });
    fixture = TestBed.createComponent(FinishedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
