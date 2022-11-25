import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientWalletModel } from 'src/app/models/clientWallet.model';
import { UserDataService } from 'src/app/services/user/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private router: Router, private userDataService: UserDataService) {
    this.showBackButton = router.url !== '/main' ? true : false;
  }

  showBackButton = true;

  client: ClientModel;
  avatar: string;
  nick: string;
  balance: ClientWalletModel;

  ngOnInit(): void {
    this.userDataService.balance.subscribe(newBalance => {
      this.balance = newBalance;
    });

    this.userDataService.client.subscribe(newClientData => {
      this.client = newClientData;
      if (newClientData.avatar) {
        this.avatar = "https://cdn.discordapp.com/avatars/" + this.client.discordId + "/" + this.client.avatar + ".jpg";
      } else {
        this.avatar = "/assets/bugule.png";
      }
      this.nick = newClientData.guildNick;
    });
  }

  goBackToMenu() {
    this.router.navigate(['/main'])
  }

  logout() {
    window.location.href = environment.backendUrl + '/api/auth/logout';
  }
}
