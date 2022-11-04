import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BetObject } from '../../objects/betObject';
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

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getWheel();
    this.resetWheel();
    this.backendService.getInitialWheelPos().subscribe(count => {
      if (this.wheelEl && !this.initialPosSet && !this.reset) {
        this.initialPos = count;
        this.setWheelRotation();
      }
    });

    this.backendService.getWheelSpin().subscribe((count: number) => {
      this.wheelPos = count;
      if (this.initialPosSet && !this.reset) {
        if (this.wheelEl) {
          this.spinWheel(this.wheelPos);
        }
      }
    });
  }

  resetWheel() {
    this.backendService.resetWheel().subscribe(value => {
      if (value) {
        this.reset = true;
        this.initialPosSet = false;
        if (this.wheelEl) {
          this.initialPos = 0;
          this.wheelEl.style.transform = "rotate(0deg)";
        }
        this.getSpinStart()
      }
    })
  }

  getWheel() {
    this.wheelEl = document.getElementById("wheel");
  }

  setWheelRotation() {
    if (this.wheelEl) {
      this.wheelEl.style.transform = `rotate(-${this.initialPos}deg)`;
      setTimeout(() => {
        this.initialPosSet = true;
      }, 10);
    }
  }

  getSpinStart() {
    this.backendService.getStartSpin().subscribe((data) => {
      if (data) {
        this.gotNewMessages = false;
        this.reset = false;
        this.initialPosSet = true;
      }
    });
  }

  spinWheel(wheelPos: number) {
    if (this.wheelEl) {
      this.wheelEl.style.transform = `rotate(-${wheelPos}deg)`;
      this.wheelEl.addEventListener('transitionend', () => {
        if (!this.gotNewMessages) {
          this.backendService.getNewWheelMessages();
          this.gotNewMessages = true;
        }
      });
    }
  }
}
