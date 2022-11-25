import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientModel } from 'src/app/models/client.model';
import { ClientWalletModel } from 'src/app/models/clientWallet.model';
import { ConvertCurrencies } from 'src/app/utils/convertCurrencies';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private apiService: ApiService) { }

  client: BehaviorSubject<ClientModel> = new BehaviorSubject<ClientModel>(new ClientModel);
  balance: BehaviorSubject<ClientWalletModel> = new BehaviorSubject<ClientWalletModel>(new ClientWalletModel("0", "0", "0"));
  clientWalletInZeton: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  init(): void {
    this.updateClientData();
    this.updateClientBalance();
  }

  updateClientData() {
    this.apiService.getUserData().subscribe(data => {
      this.client.next(data);
    });
  }

  updateClientBalance() {
    this.apiService.getUserBalance().subscribe(data => {
      if (data) {
        this.balance.next(data);
        this.clientWalletInZeton.next(ConvertCurrencies.convertToZetonai(parseInt(data.GOLD), parseInt(data.SILVER), parseInt(data.COPPER)));
      }
    });

  }
}
