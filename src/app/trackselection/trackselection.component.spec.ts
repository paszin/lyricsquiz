import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackselectionComponent } from './trackselection.component';

describe('TrackselectionComponent', () => {
  let component: TrackselectionComponent;
  let fixture: ComponentFixture<TrackselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
