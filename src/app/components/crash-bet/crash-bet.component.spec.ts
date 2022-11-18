import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrashBetComponent } from './crash-bet.component';

describe('CrashBetComponent', () => {
  let component: CrashBetComponent;
  let fixture: ComponentFixture<CrashBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrashBetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrashBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
