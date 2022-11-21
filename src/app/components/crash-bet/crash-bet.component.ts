import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-crash-bet',
  templateUrl: './crash-bet.component.html',
  styleUrls: ['./crash-bet.component.scss']
})
export class CrashBetComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  autoStopAmount = 0;
  @Output() newAutoStopEvent = new EventEmitter();

  ngOnInit(): void {
  }

  stopCrash() {
    this.backendService.emit(new SocketEventObject('crash', 'stop', null));
  }

  setAutoStop() {
    //send auto stop number to payment
    this.newAutoStopEvent.emit(this.autoStopAmount);
  }

}
