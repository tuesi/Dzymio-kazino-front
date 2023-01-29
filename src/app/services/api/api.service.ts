import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ClientModel } from '../../models/client.model';
import { ClientWalletModel } from '../../models/clientWallet.model';
import { environment } from '../../../environments/environment';
import { ClientLivesModel } from 'src/app/models/clientLives.model';
import { LeaderboardDataModel } from 'src/app/models/leaderboardData.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUserData(): Observable<ClientModel> {
    return this.httpClient.get<ClientModel>(environment.backendUrl + '/api/auth', {
      withCredentials: true
    }).pipe(map((response: ClientModel) => {
      if (response) {
        return response;
      } else {
        return new ClientModel();
      }
    }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(new ClientModel());
      })
    );
  }

  getUserBalance(): Observable<ClientWalletModel> {
    return this.httpClient.get<ClientWalletModel>(environment.backendUrl + '/api/jimmy/balance', {
      withCredentials: true,
    }).pipe(map((response: ClientWalletModel) => {
      if (response) {
        return response;
      } else {
        return new ClientWalletModel("0", "0", "0");
      }
    }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(new ClientWalletModel("0", "0", "0"));
      }))
  }

  getUserLives(): Observable<ClientLivesModel> {
    return this.httpClient.get<ClientLivesModel>(environment.backendUrl + '/api/lives/getLives', {
      withCredentials: true,
    }).pipe(map((clientLives: ClientLivesModel) => {
      if (clientLives) {
        return clientLives;
      } else {
        return new ClientLivesModel();
      }
    }));
  }

  getLeaderboards(): Observable<LeaderboardDataModel[]> {
    return this.httpClient.get<LeaderboardDataModel[]>(environment.backendUrl + '/api/leaderboard/getLeaderboard').pipe(map((leaderboard: LeaderboardDataModel[]) => {
      if (leaderboard) {
        return leaderboard;
      } else {
        return [];
      }
    }))
  }
}
