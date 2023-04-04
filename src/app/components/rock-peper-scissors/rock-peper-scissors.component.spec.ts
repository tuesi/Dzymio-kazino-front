import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockPeperScissorsComponent } from './rock-peper-scissors.component';

describe('RockPeperScissorsComponent', () => {
  let component: RockPeperScissorsComponent;
  let fixture: ComponentFixture<RockPeperScissorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RockPeperScissorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RockPeperScissorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
