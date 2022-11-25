import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientModel } from 'src/app/models/client.model';
import { ClientWalletModel } from 'src/app/models/clientWallet.model';
import { ConvertCurrencies } from 'src/app/utils/convertCurrencies';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private apiService: ApiService) { }

  client: Subject<ClientModel> = new Subject<ClientModel>();
  balance: Subject<ClientWalletModel> = new Subject<ClientWalletModel>();
  clientWalletInZeton: Subject<number> = new Subject<number>();

  init(): void {
    this.balance.next(new ClientWalletModel("0", "0", "0"));
    this.apiService.getUserData().subscribe(data => {
      this.client.next(data);
    });

    this.updateClientBalance();
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
