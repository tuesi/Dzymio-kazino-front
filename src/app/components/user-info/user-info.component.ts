import { Component, OnInit } from '@angular/core';
import { ClientObject } from 'src/app/objects/clientObject';
import { ClientWalletObject } from 'src/app/objects/clientWalletObject';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  client: ClientObject;
  avatar: string;
  nick: string;
  balance: ClientWalletObject;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserData().subscribe(data => {
      console.log(data);
      this.client = data;
      this.avatar = "https://cdn.discordapp.com/avatars/" + this.client.discordId + "/" + this.client.avatar + ".jpg";
      this.nick = data.guildNick;
    });
    
    this.apiService.getUserBalance().subscribe(data => {
      console.log(data);
      this.balance = data;
    });
  }
}
