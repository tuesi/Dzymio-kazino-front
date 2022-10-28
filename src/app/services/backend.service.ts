import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { BetObject } from '../Objects/betObject';


@Injectable()
export class BackendService {

  private socket: Socket;
  readonly uri: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  public sendBet(newBet: BetObject) {
    this.socket.emit('bet', newBet);
  }

  public getNewWheelMessages() {
    this.socket.emit('getWheelMessages');
  }

  public getStartSpin(): Observable<boolean> {
    return this.listen('startSpin').pipe(
      map((data) => {
        return data as boolean;
      })
    )
  }

  public resetWheel(): Observable<boolean> {
    return this.listen('resetWheel').pipe(
      map((data) => {
        return data as boolean;
      })
    );
  }

  public getWheelMessages(): Observable<string[]> {
    return this.listen('wheelMessages').pipe(
      map((data) => {
        return data as string[];
      })
    );
  }


  public getWheelSpin(): Observable<number> {
    return this.listen('wheelPos').pipe(
      map((data) => {
        return data as number;
      })
    );
  }

  public getInitialWheelPos(): Observable<number> {
    return this.listen('initialWheelPos').pipe(
      map((data) => {
      return data as number;
      })
    );
  }

  public getTimeTillNextSpin(): Observable<number> {
    return this.listen('timeTillSpin').pipe(
      map((data) => {
        return data as number;
      })
    );
  }

  public getBetError(): Observable<boolean> {
    return this.listen('betError').pipe(
      map((data) => {
        if(data) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
