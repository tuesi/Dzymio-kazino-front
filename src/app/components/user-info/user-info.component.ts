import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientObject } from 'src/app/objects/clientObject';
import { ClientWalletObject } from 'src/app/objects/clientWalletObject';
import { ApiService } from 'src/app/services/api/api.service';
import { ConvertCurrencies } from 'src/app/utils/convertCurrencies';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  client: ClientObject;
  avatar: string;
  nick: string;
  balance: ClientWalletObject;
  clientWalletInZeton = 0;

  @Output() newUserEvent = new EventEmitter<ClientObject>();
  @Output() newClientWalletInZetonEvent = new EventEmitter<number>();

  ngOnInit(): void {
    this.apiService.getUserData().subscribe(data => {
      this.client = data;
      this.avatar = "https://cdn.discordapp.com/avatars/" + this.client.discordId + "/" + this.client.avatar + ".jpg";
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
    window.location.href = 'http://localhost:3000/api/auth/logout';
  }
}
