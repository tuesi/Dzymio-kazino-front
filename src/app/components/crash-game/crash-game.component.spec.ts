import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrashGameComponent } from './crash-game.component';

describe('CrashGameComponent', () => {
  let component: CrashGameComponent;
  let fixture: ComponentFixture<CrashGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrashGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrashGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
