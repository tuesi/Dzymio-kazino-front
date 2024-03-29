import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientWalletModel } from 'src/app/models/clientWallet.model';
import { BackendService } from 'src/app/services/backend/backend.service';
import { UserDataService } from 'src/app/services/user/user-data.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private router: Router, private userDataService: UserDataService, private dialog: MatDialog, private api: ApiService) {
  }

  @Input() showBackButton = true;

  client: ClientModel;
  avatar: string;
  nick: string;
  balance: ClientWalletModel;
  lives: Number;

  ngOnInit(): void {
    this.userDataService.balance.subscribe(newBalance => {
      this.balance = newBalance;
    });

    this.userDataService.client.subscribe(newClientData => {
      this.client = newClientData;
      if (newClientData.avatar) {
        this.avatar = "https://cdn.discordapp.com/avatars/" + this.client.discordId + "/" + this.client.avatar + ".jpg";
      } else {
        this.avatar = "/assets/bugule.jpg";
      }
      this.nick = newClientData.guildNick;
    });

    this.userDataService.clientLives.subscribe(clientLives => {
      this.lives = clientLives.lives;
    });
  }

  goBackToMenu() {
    this.router.navigate(['/main'])
  }

  logout() {
    window.location.href = environment.backendUrl + '/api/auth/logout';
  }
}
