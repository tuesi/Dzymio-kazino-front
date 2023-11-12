import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherLowerGameComponent } from './higher-lower-game.component';

describe('HigherLowerGameComponent', () => {
  let component: HigherLowerGameComponent;
  let fixture: ComponentFixture<HigherLowerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherLowerGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherLowerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
