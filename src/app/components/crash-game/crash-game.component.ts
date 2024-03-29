import { Component, OnInit, ViewChild } from '@angular/core';
import { BetModel } from 'src/app/models/bet.model';
import { ClientModel } from 'src/app/models/client.model';
import { SocketEventModel } from 'src/app/models/socketEvent.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-crash-game',
  templateUrl: './crash-game.component.html',
  styleUrls: ['./crash-game.component.scss']
})
export class CrashGameComponent implements OnInit {

  constructor(private backendService: BackendService, private audioService: AudioService, private userDataService: UserDataService) { }

  roomName = 'crash';

  betAmount = 0;
  clientData: ClientModel;
  clientWalletInZeton = 0;
  disabled = false;
  betMade = false;
  reset = false;

  betAutoStopNuber = 0;

  itemsLoaded = new Map<string, boolean>([
    ["messages", false],
    ["previous", false]
  ]);
  loading = true;

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
        this.betAutoStopNuber = 0;
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

  setBetAmount(amount: number) {
    if (this.clientWalletInZeton >= amount) {
      this.betAmount = amount;
    }
  }

  setAutoStopAmount(amount: number) {
    this.betAutoStopNuber = amount;
  }

  setLoaded(loadName: string) {
    this.itemsLoaded.forEach((value, key) => {
      if (key === loadName) {
        this.itemsLoaded.set(key, true);
      }
    });
    this.loading = !this.checkLoadingStatus();
  }

  setBetStatus(value: boolean) {
    this.userDataService.updateClientLives();
    if (value) {
      this.audioService.playWinSound();
    } else {
      this.audioService.playLoseSound();
    }
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
    newBet.prediction = this.betAutoStopNuber > 1 ? this.betAutoStopNuber.toString() : '0';
    if (newBet.clientId && newBet.clientNick && newBet.betAmount) {
      this.backendService.emit(new SocketEventModel(this.roomName, 'bet', newBet));
      this.disabled = true;
      this.betMade = true;
    }
  }

}
