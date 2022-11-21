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

  itemsLoaded = new Map<string, boolean>([
    ["messages", false],
    ["previous", false],
    ["clientData", false],
    ["clientWallet", false],
  ]);
  loading = true;

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

    this.backendService.listen('initialButtonState').subscribe(state => {
      if (!state) {
        this.disabled = true;
      } else {
        this.disabled = false;
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
    this.setLoaded('clientData');
  }

  setClientWalletInZeton(amount: number) {
    this.clientWalletInZeton = amount;
    this.setLoaded('clientWallet');
  }

  setBetStatus(status: boolean) {
    if (status) {
      this.betStatus = "win";
    } else {
      this.betStatus = "lose";
    }
  }

  setLoaded(loadName: string) {
    console.log(loadName);
    this.itemsLoaded.forEach((value, key) => {
      if (key === loadName) {
        this.itemsLoaded.set(key, true);
      }
    });
    console.log(!this.checkLoadingStatus());
    this.loading = !this.checkLoadingStatus();
  }

  checkLoadingStatus(): boolean {
    let count = 0;
    this.itemsLoaded.forEach((value, key) => {
      if (value === true) {
        count++;
      }
    });
    console.log(count);
    return count === this.itemsLoaded.size;
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
