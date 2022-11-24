import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get(environment.backendUrl + '/api/auth', {
      withCredentials: true
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
