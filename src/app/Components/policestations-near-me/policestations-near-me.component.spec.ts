import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicestationsNearMeComponent } from './policestations-near-me.component';

describe('PolicestationsNearMeComponent', () => {
  let component: PolicestationsNearMeComponent;
  let fixture: ComponentFixture<PolicestationsNearMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolicestationsNearMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicestationsNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
