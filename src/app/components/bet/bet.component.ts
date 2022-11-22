import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {

  @Output() newPredictionEvent = new EventEmitter<string>();

  @Input() disabled = false;
  @Input() set reset(value: boolean) {
    if (value) {
      this.resetButtonStates();
    }
  }

  colorGreen = false;
  colorRed = false;
  colorBlue = false;

  oneToSix = false;
  sevenToTwelve = false;
  thirtheenToEighteen = false;

  lowerThanNine = false;
  moreThanNine = false;
  even = false;
  odd = false;

  one = false;
  two = false;
  three = false;
  four = false;
  five = false;
  six = false;
  seven = false;
  eight = false;
  nine = false;
  ten = false;
  eleven = false;
  twelve = false;
  thirtheen = false;
  fourtheen = false;
  fiftheen = false;
  sixteen = false;
  seventeen = false;
  eighteen = false;
  X = false;
  W = false;

  eveGreen = false;
  evenRed = false;
  evenBlue = false;
  oddGreen = false;
  oddRed = false;
  oddBlue = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectButton(buttonName: string) {
    this.newPredictionEvent.emit(buttonName);
    this.changeButtonState(buttonName);
  }

  changeButtonState(buttonName: string) {
    this.resetButtonStates();
    switch (buttonName) {
      case "colorGreen":
        this.colorGreen = true;
        break;
      case "colorRed":
        this.colorRed = true;
        break;
      case "colorBlue":
        this.colorBlue = true;
        break;
      case "oneToSix":
        this.oneToSix = true;
        break;
      case "sevenToTwelve":
        this.sevenToTwelve = true;
        break;
      case "thirtheenToEighteen":
        this.thirtheenToEighteen = true;
        break;
      case "lowerThanNine":
        this.lowerThanNine = true;
        break;
      case "moreThanNine":
        this.moreThanNine = true;
        break;
      case "even":
        this.even = true;
        break;
      case "odd":
        this.odd = true;
        break;
      case "one":
        this.one = true;
        break;
      case "two":
        this.two = true;
        break;
      case "three":
        this.three = true;
        break;
      case "four":
        this.four = true;
        break;
      case "five":
        this.five = true;
        break;
      case "six":
        this.six = true;
        break;
      case "seven":
        this.seven = true;
        break;
      case "eight":
        this.eight = true;
        break;
      case "nine":
        this.nine = true;
        break;
      case "ten":
        this.ten = true;
        break;
      case "eleven":
        this.eleven = true;
        break;
      case "twelve":
        this.twelve = true;
        break;
      case "thirtheen":
        this.thirtheen = true;
        break;
      case "fourtheen":
        this.fourtheen = true;
        break;
      case "fiftheen":
        this.fiftheen = true;
        break;
      case "sixteen":
        this.sixteen = true;
        break;
      case "seventeen":
        this.seventeen = true;
        break;
      case "eighteen":
        this.eighteen = true;
        break;
      case "X":
        this.X = true;
        break;
      case "W":
        this.W = true;
        break;
      case "evenGreen":
        this.eveGreen = true;
        break;
      case "evenRed":
        this.evenRed = true;
        break;
      case "evenBlue":
        this.evenBlue = true;
        break;
      case "oddGreen":
        this.oddGreen = true;
        break;
      case "oddRed":
        this.oddRed = true;
        break;
      case "oddBlue":
        this.oddBlue = true;
        break;
    }
  }

  resetButtonStates() {
    this.colorGreen = false;
    this.colorRed = false;
    this.colorBlue = false;

    this.oneToSix = false;
    this.sevenToTwelve = false;
    this.thirtheenToEighteen = false;

    this.lowerThanNine = false;
    this.moreThanNine = false;
    this.even = false;
    this.odd = false;

    this.one = false;
    this.two = false;
    this.three = false;
    this.four = false;
    this.five = false;
    this.six = false;
    this.seven = false;
    this.eight = false;
    this.nine = false;
    this.ten = false;
    this.eleven = false;
    this.twelve = false;
    this.thirtheen = false;
    this.fourtheen = false;
    this.fiftheen = false;
    this.sixteen = false;
    this.seventeen = false;
    this.eighteen = false;
    this.X = false;
    this.W = false;

    this.eveGreen = false;
    this.evenRed = false;
    this.evenBlue = false;
    this.oddGreen = false;
    this.oddRed = false;
    this.oddBlue = false;
  }

}
