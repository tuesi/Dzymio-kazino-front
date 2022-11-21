import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coin-bet',
  templateUrl: './coin-bet.component.html',
  styleUrls: ['./coin-bet.component.scss']
})
export class CoinBetComponent implements OnInit {

  @Output() newPredictionEvent = new EventEmitter<number>();

  @Input() disabled = false;
  @Input() set reset(value: boolean) {
    if (value) {
      this.resetButtonStates();
    }
  }

  selectTails = false;
  selectHeads = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectBet(selection: number) {
    if (selection == 1) {
      this.selectHeads = true;
      this.selectTails = false;
      this.newPredictionEvent.emit(1);
    } else if (selection == 2) {
      this.selectTails = true;
      this.selectHeads = false;
      this.newPredictionEvent.emit(2);
    }
  }

  resetButtonStates() {
    this.selectHeads = false;
    this.selectTails = false;
  }

}
