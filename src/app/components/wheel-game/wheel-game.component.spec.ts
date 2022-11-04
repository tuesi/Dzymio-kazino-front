import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelGameComponent } from './wheel-game.component';

describe('WheelGameComponent', () => {
  let component: WheelGameComponent;
  let fixture: ComponentFixture<WheelGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
