import { Component, OnInit, ViewChild } from '@angular/core';
import { BetModel } from 'src/app/models/bet.model';
import { ClientModel } from 'src/app/models/client.model';
import { SocketEventModel } from 'src/app/models/socketEvent.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-coin-game',
  templateUrl: './coin-game.component.html',
  styleUrls: ['./coin-game.component.scss']
})
export class CoinGameComponent implements OnInit {

  roomName = 'coin';

  betPrediction = -1;
  clientData: ClientModel;
  clientWalletInZeton = 0;
  disabled = false;
  betMade = false;
  betStatus = 'none';
  betAmount = 0;
  reset = false;

  itemsLoaded = new Map<string, boolean>([
    ["messages", false],
    ["previous", false]
  ]);
  loading = true;

  constructor(private backendService: BackendService, private audioService: AudioService, private userDataService: UserDataService) { }

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

    this.userDataService.clientWalletInZeton.subscribe(clientWallet => {
      this.clientWalletInZeton = clientWallet;
    });

    this.userDataService.client.subscribe(clientData => {
      this.clientData = clientData;
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

  setBetStatus(status: boolean) {
    this.userDataService.updateClientLives();
    if (status) {
      this.betStatus = "win";
      this.audioService.playWinSound();
    } else {
      this.betStatus = "lose";
      this.audioService.playLoseSound();
    }
  }

  setLoaded(loadName: string) {
    this.itemsLoaded.forEach((value, key) => {
      if (key === loadName) {
        this.itemsLoaded.set(key, true);
      }
    });
    this.loading = !this.checkLoadingStatus();
  }

  checkLoadingStatus(): boolean {
    let count = 0;
    this.itemsLoaded.forEach((value, key) => {
      if (value === true) {
        count++;
      }
    });
    return count === this.itemsLoaded.size;
  }

  sendBet() {
    this.userDataService.updateClientData();
    let newBet = new BetModel();
    newBet.clientId = this.clientData.discordId;
    newBet.clientNick = this.clientData.guildNick;
    newBet.betAmount = this.betAmount;
    newBet.prediction = this.betPrediction.toString();
    if (newBet.clientId && newBet.clientNick && newBet.betAmount && newBet.prediction && this.betPrediction !== -1) {
      this.backendService.emit(new SocketEventModel(this.roomName, 'bet', newBet));
      this.disabled = true;
      this.betMade = true;
    }
  }

}
