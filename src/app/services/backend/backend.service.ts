import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private socket: Socket;
  readonly uri: string = environment.backendUrl;

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
