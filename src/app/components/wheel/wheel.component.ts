import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BetObject } from '../../objects/betObject';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class WheelComponent implements OnInit{

  spin = false;
  wheelEl = document.getElementById("wheel");
  sliceSize = 360 / 20;
  wheelPos = 0;
  initialPos = 0;
  initialPosSet = false;
  reset = false;
  gotNewMessages = false;

  betAmount = 0;
  betPrediction = '';

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    console.log(this.initialPosSet);
    this.getWheel();
    this.resetWheel();
    this.backendService.getInitialWheelPos().subscribe(count => {
      if(this.wheelEl && !this.initialPosSet && !this.reset) {
        this.initialPos = count;
        this.setWheelRotation();
      }
    });

    this.backendService.getWheelSpin().subscribe((count: number) => {
      this.wheelPos = count;
      //console.log(count);
      if(this.initialPosSet && !this.reset) {
        if(this.wheelEl) {
          this.spinWheel(this.wheelPos);
        }
      }
    });
  }

  resetWheel() {
    this.backendService.resetWheel().subscribe(value => {
      if(value) {
        console.log("HELLO");
        this.reset = true;
        this.initialPosSet = false;
        if(this.wheelEl) {
          this.initialPos = 0;
          //this.wheelEl.style.transition = "none";
          this.wheelEl.style.transform = "rotate(0deg)";
          //this.wheelEl.style.transition = "none";
        }
        this.getSpinStart()
      }
    })
  }

  getWheel() {
    this.wheelEl = document.getElementById("wheel");
  }

  setWheelRotation() {
    if(this.wheelEl) {
      this.wheelEl.style.transform = `rotate(-${this.initialPos}deg)`;
      console.log("rotate");
      setTimeout(() => {
        this.initialPosSet = true;
      },10);
    }
  }

  getSpinStart() {
    this.backendService.getStartSpin().subscribe((data) => {
      if(data) {
        this.gotNewMessages = false;
        this.reset = false;
        this.initialPosSet = true;
      }
    });
  }

  spinWheel(wheelPos: number) {
    if(this.wheelEl) {
      this.wheelEl.style.transform = `rotate(-${wheelPos}deg)`;
      this.wheelEl.addEventListener('transitionend', () => {
        if(!this.gotNewMessages) {
          this.backendService.getNewWheelMessages();
          this.gotNewMessages = true;
        }
      });
    }
  }

  setBetAmount(amount: number) {
    this.betAmount = amount;
    console.log(this.betAmount);
  }

  setBetPrediction(prediction: string) {
    this.betPrediction = prediction;
  }

  sendBet() {
      let newBet = new BetObject();
      newBet.clientId = "123";
      newBet.betAmount = this.betAmount;
      newBet.prediction = this.betPrediction;
      this.backendService.sendBet(newBet);
  }
}
