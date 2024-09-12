import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorProfilePopupComponent } from './counselor-profile-popup.component';

describe('CounselorProfilePopupComponent', () => {
  let component: CounselorProfilePopupComponent;
  let fixture: ComponentFixture<CounselorProfilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounselorProfilePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounselorProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
