import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsNearMeComponent } from './hospitals-near-me.component';

describe('HospitalsNearMeComponent', () => {
  let component: HospitalsNearMeComponent;
  let fixture: ComponentFixture<HospitalsNearMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalsNearMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalsNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
