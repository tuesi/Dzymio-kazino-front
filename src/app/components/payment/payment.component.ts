import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BetObject } from '../../objects/betObject';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  zetonai = 0;
  piniginiai = 0;
  makseideriai = 0;
  all = 0;

  @Output() newBetAmountEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addZetonai() {
    if(this.zetonai == 100) {
      this.zetonai = 0;
    } else {
      this.zetonai++;
    }
    this.setBetAmount();
  }

  removeZetonai() {
    if(this.zetonai > 0) {
      this.zetonai--;
    }
    this.setBetAmount();
  }

  addPiniginiai() {
    if(this.piniginiai == 100) {
      this.piniginiai = 0;
    } else {
      this.piniginiai++;
    }
    this.setBetAmount();
  }

  removePiniginiai() {
    if(this.piniginiai > 0) {
      this.piniginiai--;
    }
    this.setBetAmount();
  }

  addMakseideriai() {
    if(this.makseideriai == 100) {
      this.makseideriai = 0;
    } else {
      this.makseideriai++;
    }
    this.setBetAmount();
  }

  removeMakseideriai() {
    if(this.makseideriai > 0) {
      this.makseideriai--;
    }
    this.setBetAmount();
  }

  setZetonai(amount: number) {
    this.zetonai = Math.abs(amount);
    this.setBetAmount();
  }

  setPiniginiai(amount: number) {
    this.piniginiai = Math.abs(amount);
    this.setBetAmount();
  }

  setMakseideriai(amount: number) {
    this.makseideriai = Math.abs(amount);
    this.setBetAmount();
  }

  convertToZetonai() {
    this.all = this.zetonai;
    this.all += (this.piniginiai * 100);
    this.all += (this.makseideriai * 1000);
  }

  setBetAmount() {
    this.convertToZetonai();
    this.newBetAmountEvent.emit(this.all);
  }
}
