import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchItemComponent } from './pitch-item.component';

describe('PitchItemComponent', () => {
  let component: PitchItemComponent;
  let fixture: ComponentFixture<PitchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
