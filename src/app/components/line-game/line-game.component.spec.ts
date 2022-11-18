import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGameComponent } from './line-game.component';

describe('LineGameComponent', () => {
  let component: LineGameComponent;
  let fixture: ComponentFixture<LineGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
