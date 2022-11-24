import { Component, OnInit, ViewChild } from '@angular/core';
import { BetObject } from 'src/app/objects/betObject';
import { ClientObject } from 'src/app/objects/clientObject';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { AudioService } from 'src/app/services/audio/audio.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-line-game',
  templateUrl: './line-game.component.html',
  styleUrls: ['./line-game.component.scss']
})
export class LineGameComponent implements OnInit {

  constructor(private backendService: BackendService, private audioService: AudioService) { }

  @ViewChild(UserInfoComponent)
  private userInforComponent!: UserInfoComponent;

  roomName = 'line';

  betAmount = 0;
  clientData: ClientObject;
  clientWalletInZeton = 0;
  disabled = false;
  betMade = false;
  reset = false;

  itemsLoaded = new Map<string, boolean>([
    ["line", false],
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

  setClientData(clientData: ClientObject) {
    this.clientData = clientData;
    this.setLoaded('clientData');
  }

  setClientWalletInZeton(amount: number) {
    this.clientWalletInZeton = amount;
    this.setLoaded('clientWallet');
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
    this.userInforComponent.updateClientBalance();
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
    let newBet = new BetObject();
    newBet.clientId = this.clientData.discordId;
    newBet.clientNick = this.clientData.guildNick;
    newBet.betAmount = this.betAmount;
    newBet.prediction = '';
    if (newBet.clientId && newBet.clientNick && newBet.betAmount) {
      this.backendService.emit(new SocketEventObject('line', 'bet', newBet));
      this.disabled = true;
      this.betMade = true;
    }
  }

}
