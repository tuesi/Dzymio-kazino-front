import { Component, OnInit } from '@angular/core';
import { BetObject } from 'src/app/objects/betObject';
import { ClientObject } from 'src/app/objects/clientObject';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-coin-game',
  templateUrl: './coin-game.component.html',
  styleUrls: ['./coin-game.component.scss']
})
export class CoinGameComponent implements OnInit {

  roomName = 'coin';

  betPrediction = -1;
  clientData: ClientObject;
  clientWalletInZeton = 0;
  disabled = false;
  betMade = false;
  betStatus = 'none';
  betAmount = 0;
  reset = false;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.joinRoom(this.roomName);

    this.backendService.listen('betTimeEnd').subscribe(endTime => {
      if (endTime) {
        this.disabled = true;
        this.reset = false;
      }
    });

    this.backendService.listen('newRound').subscribe(newRound => {
      if (newRound) {
        this.disabled = false;
        this.betMade = false;
        this.reset = true;
        this.betAmount = 0;
        this.betPrediction = -1;
        this.betStatus = 'none';
      }
    });
  }

  setBetPrediction(value: number) {
    this.betPrediction = value;
  }

  setBetAmount(amount: number) {
    if (this.clientWalletInZeton >= amount) {
      this.betAmount = amount;
    }
  }

  setClientData(clientData: ClientObject) {
    this.clientData = clientData;
  }

  setClientWalletInZeton(amount: number) {
    this.clientWalletInZeton = amount;
  }

  setBetStatus(status: boolean) {
    if (status) {
      this.betStatus = "win";
    } else {
      this.betStatus = "lose";
    }
  }

  sendBet() {
    let newBet = new BetObject();
    newBet.clientId = this.clientData.discordId;
    newBet.clientNick = this.clientData.guildNick;
    newBet.betAmount = this.betAmount;
    newBet.prediction = this.betPrediction.toString();
    if (newBet.clientId && newBet.clientNick && newBet.betAmount && newBet.prediction) {
      this.backendService.emit(new SocketEventObject('coin', 'bet', newBet));
      this.disabled = true;
      this.betMade = true;
    }
  }

}
