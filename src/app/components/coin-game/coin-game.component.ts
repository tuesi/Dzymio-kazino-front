import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-coin-game',
  templateUrl: './coin-game.component.html',
  styleUrls: ['./coin-game.component.scss']
})
export class CoinGameComponent implements OnInit {

  betValue: number;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.joinRoom('coin');
  }

  setBetValue(value: number) {
    this.betValue = value;
  }

}
