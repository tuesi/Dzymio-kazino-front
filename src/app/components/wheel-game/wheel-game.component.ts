import { Component, OnInit } from '@angular/core';
import { BetObject } from 'src/app/objects/betObject';
import { ClientObject } from 'src/app/objects/clientObject';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-wheel-game',
  templateUrl: './wheel-game.component.html',
  styleUrls: ['./wheel-game.component.scss']
})
export class WheelGameComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  betAmount = 0;
  betPrediction = '';
  clientData: ClientObject;
  clientWalletInZeton = 0;
  disabled = false;
  betMade = false;
  reset = false;
  betStatus = 'none';

  socketSubscribeEvents = ['betTimeEnd', 'newRound'];

  ngOnInit(): void {

    this.backendService.joinRoom('wheel');

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
        this.betPrediction = '';
      }
    });
  }

  setBetAmount(amount: number) {
    if (this.clientWalletInZeton >= amount) {
      this.betAmount = amount;
    }
  }

  setBetPrediction(prediction: string) {
    this.betPrediction = prediction;
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
    newBet.prediction = this.betPrediction;
    if (newBet.clientId && newBet.clientNick && newBet.betAmount && newBet.prediction) {
      this.backendService.emit(new SocketEventObject('wheel', 'bet', newBet));
      this.disabled = true;
      this.betMade = true;
    }
  }

}
