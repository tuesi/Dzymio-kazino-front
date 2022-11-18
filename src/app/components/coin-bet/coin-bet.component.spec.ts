import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinBetComponent } from './coin-bet.component';

describe('CoinBetComponent', () => {
  let component: CoinBetComponent;
  let fixture: ComponentFixture<CoinBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinBetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
