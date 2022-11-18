import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { BetResponseObject } from 'src/app/objects/betResponseObject';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { BetObject } from '../../objects/betObject';


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

  emit(data: SocketEventObject) {
    this.socket.emit('event', data);
  }

  public joinRoom(roomName: string) {
    this.socket.emit('join', roomName);
  }

  // public sendBet(newBet: BetObject) {
  //   this.socket.emit('bet', newBet);
  // }

  // public getNewWheelMessages() {
  //   this.socket.emit('getWheelMessages');
  // }

  // public getStartSpin(): Observable<boolean> {
  //   return this.listen('startSpin').pipe(
  //     map((data) => {
  //       return data as boolean;
  //     })
  //   )
  // }

  // public resetWheel(): Observable<boolean> {
  //   return this.listen('resetWheel').pipe(
  //     map((data) => {
  //       return data as boolean;
  //     })
  //   );
  // }

  // public getWheelMessages(): Observable<string[]> {
  //   return this.listen('wheelMessages').pipe(
  //     map((data) => {
  //       return data as string[];
  //     })
  //   );
  // }


  // public getWheelSpin(): Observable<number> {
  //   return this.listen('wheelPos').pipe(
  //     map((data) => {
  //       return data as number;
  //     })
  //   );
  // }

  // public getInitialWheelPos(): Observable<number> {
  //   return this.listen('initialWheelPos').pipe(
  //     map((data) => {
  //       return data as number;
  //     })
  //   );
  // }

  // public getTimeTillNextSpin(): Observable<number> {
  //   return this.listen('timeTillSpin').pipe(
  //     map((data) => {
  //       return data as number;
  //     })
  //   );
  // }

  // public getBetTimeEnd(): Observable<boolean> {
  //   return this.listen('betTimeEnd').pipe(
  //     map((data) => {
  //       return data as boolean;
  //     })
  //   )
  // }

  // public getNewRound(): Observable<boolean> {
  //   return this.listen('newRound').pipe(
  //     map((data) => {
  //       return data as boolean;
  //     })
  //   )
  // }

  // public getBetStatus(): Observable<BetResponseObject> {
  //   return this.listen('betStatus').pipe(
  //     map((data) => {
  //       return data as BetResponseObject;
  //     })
  //   )
  // }

  public getBetError(): Observable<boolean> {
    return this.listen('betError').pipe(
      map((data) => {
        if (data) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
