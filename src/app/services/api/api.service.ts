import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ClientObject } from 'src/app/objects/clientObject';
import { ClientWalletObject } from 'src/app/objects/clientWalletObject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUserData(): Observable<ClientObject> {
    return this.httpClient.get<ClientObject>('http://localhost:3000/api/auth', {
      withCredentials: true
    }).pipe(map((response: ClientObject) => {
      if (response) {
        return response;
      } else {
        return new ClientObject;
      }
    }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(new ClientObject);
      })
    );
  }

  getUserBalance(): Observable<ClientWalletObject> {
    return this.httpClient.get<ClientWalletObject>('http://localhost:3000/api/jimmy/balance', {
      withCredentials: true,
    }).pipe(map((response: ClientWalletObject) => {
      if (response) {
        return response;
      } else {
        return new ClientWalletObject;
      }
    }))
  }
}
