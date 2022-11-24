import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class WheelComponent implements OnInit {

  spin = false;
  wheelEl = document.getElementById("wheel");
  sliceSize = 360 / 20;
  wheelPos = 0;
  initialPos = 0;
  initialPosSet = false;
  reset = false;
  gotNewMessages = false;

  @Output() loadingComplete = new EventEmitter();

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getWheel();

    this.backendService.listen('resetWheel').subscribe(value => {
      if (value) {
        this.reset = true;
        this.initialPosSet = false;
        if (this.wheelEl) {
          this.initialPos = 0;
          this.wheelEl.style.transform = "rotate(0deg)";
        }
      }
    });

    this.backendService.listen('startSpin').subscribe((data) => {
      if (data) {
        this.gotNewMessages = false;
        this.reset = false;
        this.initialPosSet = true;
      }
    });

    this.backendService.listen('initialWheelPos').subscribe((pos) => {
      if (this.wheelEl && !this.initialPosSet && !this.reset) {
        this.initialPos = pos as number;
        this.setWheelRotation();
      }
    });

    this.backendService.listen('wheelPos').subscribe(pos => {
      this.wheelPos = pos as number;
      if (this.initialPosSet && !this.reset) {
        if (this.wheelEl) {
          this.spinWheel(this.wheelPos);
        }
      }
    });
  }

  getWheel() {
    this.wheelEl = document.getElementById("wheel");
  }

  setWheelRotation() {
    if (this.wheelEl) {
      this.wheelEl.style.transform = `rotate(-${this.initialPos}deg)`;
      setTimeout(() => {
        this.initialPosSet = true;
        this.loadingComplete.emit('wheel');
      }, 60);
    }
  }

  spinWheel(wheelPos: number) {
    if (this.wheelEl) {
      this.wheelEl.style.transform = `rotate(-${wheelPos}deg)`;
    }
  }
}
