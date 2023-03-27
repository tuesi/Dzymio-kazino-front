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
    }).pipe(switchMap(response => {
      if (response) {
        return this.isAuthMember().pipe(map(isMember => {
          this.isMember = isMember;
          return true;
        }))
      } else {
        return of(false);
      }
    }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    );
  }

  isAuthMember(): Observable<boolean> {
    return this.httpClient.get(environment.backendUrl + '/api/auth/member', {
      withCredentials: true,
    }).pipe(map(response => {
      if (response == true) {
        this.isMember = true;
        return true;
      } else {
        return false;
      }
    })
    );
  }

  getIsMember(): boolean {
    return this.isMember;
  }
}
