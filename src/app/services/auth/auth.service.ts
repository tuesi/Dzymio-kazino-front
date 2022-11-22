import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get('http://localhost:3000/api/auth', {
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
