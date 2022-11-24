import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BetModel } from 'src/app/models/bet.model';
import { ClientModel } from 'src/app/models/client.model';
import { SocketEventModel } from 'src/app/models/socketEvent.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-wheel-game',
  templateUrl: './wheel-game.component.html',
  styleUrls: ['./wheel-game.component.scss']
})
export class WheelGameComponent implements OnInit {

  constructor(private backendService: BackendService, private audioService: AudioService) { }

  @ViewChild(UserInfoComponent)
  private userInforComponent!: UserInfoComponent;

  roomName = 'wheel';

  betAmount = 0;
  betPrediction = '';
  clientData: ClientModel;
  clientWalletInZeton = 0;
  disabled = false;
  betMade = false;
  reset = false;
  betStatus = 'none';

  itemsLoaded = new Map<string, boolean>([
    ["wheel", false],
    ["messages", false],
    ["previous", false],
    ["clientData", false],
    ["clientWallet", false],
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
        this.betPrediction = '';
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

  setBetAmount(amount: number) {
    if (this.clientWalletInZeton >= amount) {
      this.betAmount = amount;
    }
  }

  setBetPrediction(prediction: string) {
    this.betPrediction = prediction;
  }

  setClientData(clientData: ClientModel) {
    this.clientData = clientData;
    this.setLoaded('clientData');
  }

  setClientWalletInZeton(amount: number) {
    this.clientWalletInZeton = amount;
    this.setLoaded('clientWallet');
  }

  setBetStatus(status: boolean) {
    this.userInforComponent.updateClientBalance();
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
    let newBet = new BetModel();
    newBet.clientId = this.clientData.discordId;
    newBet.clientNick = this.clientData.guildNick;
    newBet.betAmount = this.betAmount;
    newBet.prediction = this.betPrediction;
    if (newBet.clientId && newBet.clientNick && newBet.betAmount && newBet.prediction) {
      this.backendService.emit(new SocketEventModel('wheel', 'bet', newBet));
      this.disabled = true;
      this.betMade = true;
    }
  }

}
