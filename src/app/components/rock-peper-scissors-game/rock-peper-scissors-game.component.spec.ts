import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockPeperScissorsGameComponent } from './rock-peper-scissors-game.component';

describe('RockPeperScissorsGameComponent', () => {
  let component: RockPeperScissorsGameComponent;
  let fixture: ComponentFixture<RockPeperScissorsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RockPeperScissorsGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RockPeperScissorsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
