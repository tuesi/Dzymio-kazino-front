import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-higher-lower-bet',
  templateUrl: './higher-lower-bet.component.html',
  styleUrls: ['./higher-lower-bet.component.scss']
})
export class HigherLowerBetComponent {

  @Output() newPredictionEvent = new EventEmitter<number>();

  @Input() disabled = false;
  @Input() set reset(value: boolean) {
    if (value) {
      this.resetButtonStates();
    }
  }

  higher = false;
  lower = false;
  equal = false;

  selectBet(selection: number) {
    if (selection === 1) {
      this.higher = true;
      this.lower = false;
      this.equal = false;
      this.newPredictionEvent.emit(selection);
    } else if (selection === 2) {
      this.higher = false;
      this.lower = true;
      this.equal = false;
      this.newPredictionEvent.emit(selection);
    } else if (selection === 0) {
      this.higher = false;
      this.lower = false;
      this.equal = true;
      this.newPredictionEvent.emit(selection);
    }
  }

  resetButtonStates() {
    this.higher = false;
    this.lower = false;
    this.equal = false;
  }
}
