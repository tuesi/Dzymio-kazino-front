import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, map, of, catchError, switchMap } from 'rxjs';
import { AuthModel } from 'src/app/models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private isMember = false;

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get(environment.backendUrl + '/api/auth', {
      withCredentials: true,
    }).pipe(map(response => {
      if (response) {
        return true;
      } else {
        return false;
      }
    }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }
}
