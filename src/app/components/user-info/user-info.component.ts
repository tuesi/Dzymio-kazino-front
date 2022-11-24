import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientWalletModel } from 'src/app/models/clientWallet.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ConvertCurrencies } from 'src/app/utils/convertCurrencies';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  client: ClientModel;
  avatar: string;
  nick: string;
  balance: ClientWalletModel;
  clientWalletInZeton = 0;

  @Output() newUserEvent = new EventEmitter<ClientModel>();
  @Output() newClientWalletInZetonEvent = new EventEmitter<number>();

  ngOnInit(): void {
    this.balance = new ClientWalletModel("0", "0", "0");
    this.apiService.getUserData().subscribe(data => {
      this.client = data;
      console.log(data);
      if (data.avatar) {
        this.avatar = "https://cdn.discordapp.com/avatars/" + this.client.discordId + "/" + this.client.avatar + ".jpg";
      } else {
        this.avatar = "/assets/bugule.png";
      }
      this.nick = data.guildNick;
      this.setUserInfo();
    });

    this.updateClientBalance();
  }

  setUserInfo() {
    this.newUserEvent.emit(this.client);
  }

  goBackToMenu() {
    this.router.navigate(['/main'])
  }

  updateClientBalance() {
    this.apiService.getUserBalance().subscribe(data => {
      this.balance = data;
      this.clientWalletInZeton = ConvertCurrencies.convertToZetonai(parseInt(data.GOLD), parseInt(data.SILVER), parseInt(data.COPPER));
      this.newClientWalletInZetonEvent.emit(this.clientWalletInZeton);
    });
  }

  logout() {
    window.location.href = environment.backendUrl + '/api/auth/logout';
  }
}
