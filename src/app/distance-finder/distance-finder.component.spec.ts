import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceFinderComponent } from './distance-finder.component';

describe('DistanceFinderComponent', () => {
  let component: DistanceFinderComponent;
  let fixture: ComponentFixture<DistanceFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
