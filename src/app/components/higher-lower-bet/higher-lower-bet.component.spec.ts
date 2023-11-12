import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherLowerBetComponent } from './higher-lower-bet.component';

describe('HigherLowerBetComponent', () => {
  let component: HigherLowerBetComponent;
  let fixture: ComponentFixture<HigherLowerBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherLowerBetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherLowerBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
