import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BetObject } from '../Objects/betObject';
import { BackendService } from '../services/backend.service';

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
    this.zetonai++;
  }

  removeZetonai() {
    this.zetonai--;
  }

  addPiniginiai() {
    this.piniginiai++;
  }

  removePiniginiai() {
    this.piniginiai--;
  }

  addMakseideriai() {
    this.makseideriai++;
  }

  removeMakseideriai() {
    this.makseideriai--;
  }

  setZetonai(amount: number) {
    this.zetonai = amount;
    this.setBetAmount();
  }

  setPiniginiai(amount: number) {
    this.piniginiai = amount;
    this.setBetAmount();
  }

  setMakseideriai(amount: number) {
    this.makseideriai = amount;
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
