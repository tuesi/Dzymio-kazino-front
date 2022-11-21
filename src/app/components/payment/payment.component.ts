import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BetResponseObject } from 'src/app/objects/betResponseObject';
import { ConvertCurrencies } from 'src/app/utils/convertCurrencies';
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
  betText = '';
  betCof: string;
  multiply: number;
  winAmountSet = false;
  betResponse: BetResponseObject;
  betResponseText = '';
  enoughBalance = true;
  everythingIsSelected = true;

  winMakseiderAmount = 0;
  winPiniginiaiAmount = 0;
  winZetonaiAmount = 0;

  @Input() disabled = false;
  @Input() betMade = false;
  @Input() set wheelBet(value: string) {
    if (value) {
      this.betResponseText = '';
      this.betText = this.betToText(value);
      this.betCof = this.betCofSet(value).toString() + ".00";
      this.multiply = this.betCofSet(value);
      this.calculateWinAmount();
    }
  }
  @Input() set coinBet(value: number) {
    this.betResponseText = '';
    if (value == 1) {
      this.betText = "Iškris Džminio neutrono moneta";
    } else if (value == 2) {
      this.betText = "Iškris Noooo moneta";
    }
    this.betCof = "2.00";
    this.multiply = 2;
    this.calculateWinAmount();
  }

  @Input() lineBet = false;
  @Input() crashBet = false;

  @Input() set reset(value: boolean) {
    if (value) {
      this.resetValues();
    }
  }

  @Input() clientWalletInZeton = 0;

  @Output() newBetAmountEvent = new EventEmitter<number>();
  @Output() newSubmitEvent = new EventEmitter();
  @Output() newBetResponseEvent = new EventEmitter<boolean>();

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('betStatus').subscribe(response => {
      this.betResponse = response as BetResponseObject;
      this.setBetResultText(this.betResponse.amount);
      if (this.betResponse.status) {
        this.newBetResponseEvent.emit(true);
      } else {
        this.newBetResponseEvent.emit(false);
      }
    });
  }

  addZetonai() {
    if (this.zetonai == 100) {
      this.zetonai = 0;
    } else {
      this.zetonai++;
    }
    this.setBetAmount();
  }

  removeZetonai() {
    if (this.zetonai > 0) {
      this.zetonai--;
    }
    this.setBetAmount();
  }

  addPiniginiai() {
    if (this.piniginiai == 100) {
      this.piniginiai = 0;
    } else {
      this.piniginiai++;
    }
    this.setBetAmount();
  }

  removePiniginiai() {
    if (this.piniginiai > 0) {
      this.piniginiai--;
    }
    this.setBetAmount();
  }

  addMakseideriai() {
    if (this.makseideriai == 100) {
      this.makseideriai = 0;
    } else {
      this.makseideriai++;
    }
    this.setBetAmount();
  }

  removeMakseideriai() {
    if (this.makseideriai > 0) {
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
    this.all += (this.makseideriai * 10000);
  }

  setBetResultText(value: number) {
    this.betResponseText = "   " + ConvertCurrencies.getMakseider(value).toString() + " M   " + ConvertCurrencies.getPiniginis(value).toString() + " P   " + ConvertCurrencies.getZetonas(value).toString() + " Z";
  }

  setBetAmount() {
    this.convertToZetonai();
    this.newBetAmountEvent.emit(this.all);
    this.calculateWinAmount();
  }

  resetValues() {
    this.all = 0;
    this.zetonai = 0;
    this.piniginiai = 0;
    this.makseideriai = 0;
    this.betText = '';
    this.betCof = '';
    this.multiply = 0;
    this.winMakseiderAmount = 0;
    this.winPiniginiaiAmount = 0;
    this.winZetonaiAmount = 0;
    this.wheelBet = '';
    this.coinBet = -1;
    this.enoughBalance = true;
    this.betResponse = new BetResponseObject;
    this.winAmountSet = false;
    this.everythingIsSelected = true;
    this.betMade = false;
  }

  sendBet() {
    if (this.clientWalletInZeton >= this.all && this.all != 0 && this.isBetMade()) {
      this.newSubmitEvent.emit();
      this.betMade = true;
      this.enoughBalance = true;
      this.everythingIsSelected = true;
    }
    if (!this.isBetMade || this.all == 0) {
      this.everythingIsSelected = false;
    }
    if (this.clientWalletInZeton < this.all) {
      this.enoughBalance = false;
    }
  }

  isBetMade(): boolean {
    return ((this.wheelBet !== '' || this.coinBet !== -1 || this.wheelBet !== undefined || this.coinBet !== undefined) || this.lineBet == true || this.crashBet == true);
  }

  calculateWinAmount() {
    if (this.all && this.multiply) {
      const amount = this.all * this.multiply;
      this.winMakseiderAmount = ConvertCurrencies.getMakseider(amount);
      this.winPiniginiaiAmount = ConvertCurrencies.getPiniginis(amount);
      this.winZetonaiAmount = ConvertCurrencies.getZetonas(amount);
      this.winAmountSet = true;
    }
  }

  betToText(betText: string): string {
    switch (betText) {
      case "colorGreen":
        return "Bus išsuktas žalias";
      case "colorRed":
        return "Bus išsuktas raudonas";
      case "colorBlue":
        return "Bus išsuktas mėlynas";
      case "oneToSix":
        return "Bus išsukta nuo vieno iki šešių";
      case "sevenToTwelve":
        return "Bus išsukta nuo septynių iki dvylikos";
      case "thirtheenToEighteen":
        return "Bus išsukta nuo trylikos iki aštuoniolikos";
      case "lowerThanNine":
        return "Bus išsukta mažiau negu devyni";
      case "moreThanNine":
        return "Bus išsukta daugiau negu devyni";
      case "even":
        return "Bus išsuktas lyginis skaičius";
      case "odd":
        return "Bus išsuktas nelyginis skaičius";
      case "one":
        return "Bus išsuktas vienetas";
      case "two":
        return "Bus išsuktas dvejetas";
      case "three":
        return "Bus išsuktas trejetas";
      case "four":
        return "Bus išsuktas ketvertas";
      case "five":
        return "Bus išsuktas penketas";
      case "six":
        return "Bus išsuktas šešetas";
      case "seven":
        return "Bus išsuktas septynetas";
      case "eight":
        return "Bus išsuktas aštuonetas";
      case "nine":
        return "Bus išsuktas devynetas";
      case "ten":
        return "Bus išsuktas dešimt";
      case "eleven":
        return "Bus išsuktas venuolika";
      case "twelve":
        return "Bus išsuktas dvylika";
      case "thirtheen":
        return "Bus išsuktas trylika";
      case "fourtheen":
        return "Bus išsuktas keturiolika";
      case "fiftheen":
        return "Bus išsuktas penkiolika";
      case "sixteen":
        return "Bus išsuktas šešiolika";
      case "seventeen":
        return "Bus išsuktas septiniolika";
      case "eighteen":
        return "Bus išsuktas aštuoniolika";
      case "X":
        return "Bus išsuktas paslaptingasis X";
      case "W":
        return "Bus išsuktas laimingasis W";
      case "evenGreen":
        return "Bus išsuktas žalias lyginis";
      case "evenRed":
        return "Bus išsuktas raudonas lyginis";
      case "evenBlue":
        return "Bus išsuktas mėlynas lyginis";
      case "oddGreen":
        return "Bus išsuktas žalias nelyginis";
      case "oddRed":
        return "Bus išsuktas raudonas nelyginis";
      case "oddBlue":
        return "Bus išsuktas mėlynas nelyginis";
      default:
        return ""
    }
  }

  betCofSet(betText: string): number {
    switch (betText) {
      case "colorGreen":
        return 3;
      case "colorRed":
        return 3;
      case "colorBlue":
        return 3;
      case "oneToSix":
        return 2;
      case "sevenToTwelve":
        return 2;
      case "thirtheenToEighteen":
        return 2;
      case "lowerThanNine":
        return 2;
      case "moreThanNine":
        return 2;
      case "even":
        return 2;
      case "odd":
        return 2;
      case "one":
        return 18;
      case "two":
        return 18;
      case "three":
        return 18;
      case "four":
        return 18;
      case "five":
        return 18;
      case "six":
        return 18;
      case "seven":
        return 18;
      case "eight":
        return 18;
      case "nine":
        return 18;
      case "ten":
        return 18;
      case "eleven":
        return 18;
      case "twelve":
        return 18;
      case "thirtheen":
        return 18;
      case "fourtheen":
        return 18;
      case "fiftheen":
        return 18;
      case "sixteen":
        return 18;
      case "seventeen":
        return 18;
      case "eighteen":
        return 18;
      case "X":
        return 18;
      case "W":
        return 18;
      case "evenGreen":
        return 6;
      case "evenRed":
        return 6;
      case "evenBlue":
        return 6;
      case "oddGreen":
        return 6;
      case "oddRed":
        return 6;
      case "oddBlue":
        return 6;
      default:
        return 0
    }
  }
}
