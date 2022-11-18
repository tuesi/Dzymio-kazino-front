import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinGameComponent } from './coin-game.component';

describe('CoinGameComponent', () => {
  let component: CoinGameComponent;
  let fixture: ComponentFixture<CoinGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
