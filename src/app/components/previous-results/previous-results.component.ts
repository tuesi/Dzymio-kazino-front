import { Component, Input, OnInit } from '@angular/core';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { BackendService } from 'src/app/services/backend/backend.service';

const coinHead = '../../../assets/coin-head.png';
const coinTail = '../../../assets/coin-tail.png';

const wheelResult1 = '../../../assets/wheel/results/wheelResult1.png';
const wheelResult2 = '../../../assets/wheel/results/wheelResult2.png';
const wheelResult3 = '../../../assets/wheel/results/wheelResult3.png';
const wheelResult4 = '../../../assets/wheel/results/wheelResult4.png';
const wheelResult5 = '../../../assets/wheel/results/wheelResult5.png';
const wheelResult6 = '../../../assets/wheel/results/wheelResult6.png';
const wheelResult7 = '../../../assets/wheel/results/wheelResult7.png';
const wheelResult8 = '../../../assets/wheel/results/wheelResult8.png';
const wheelResult9 = '../../../assets/wheel/results/wheelResult9.png';
const wheelResult10 = '../../../assets/wheel/results/wheelResult10.png';
const wheelResult11 = '../../../assets/wheel/results/wheelResult11.png';
const wheelResult12 = '../../../assets/wheel/results/wheelResult12.png';
const wheelResult13 = '../../../assets/wheel/results/wheelResult13.png';
const wheelResult14 = '../../../assets/wheel/results/wheelResult14.png';
const wheelResult15 = '../../../assets/wheel/results/wheelResult15.png';
const wheelResult16 = '../../../assets/wheel/results/wheelResult16.png';
const wheelResult17 = '../../../assets/wheel/results/wheelResult17.png';
const wheelResult18 = '../../../assets/wheel/results/wheelResult18.png';
const wheelResultX = '../../../assets/wheel/results/wheelResultX.png';
const wheelResultW = '../../../assets/wheel/results/wheelResultW.png';

const zeroResult = '../../../assets/0X.png';
const oneResult = '../../../assets/1X.png';
const oneFiveResult = '../../../assets/1,5X.png';
const twoResult = '../../../assets/2X.png';
const fourResult = '../../../assets/4X.png';
const tenResult = '../../../assets/10X.png';

@Component({
  selector: 'app-previous-results',
  templateUrl: './previous-results.component.html',
  styleUrls: ['./previous-results.component.scss']
})
export class PreviousResultsComponent implements OnInit {

  previousEventList: String[] = [];

  @Input() roomName: string;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {

    this.backendService.emit(new SocketEventObject(this.roomName, 'getPreviousResults', null));

    this.backendService.listen('previousCoins').subscribe((previous) => {
      console.log('coin');
      let previousResponse = previous as Array<number>;
      this.previousEventList = [];
      previousResponse.forEach(value => {
        if (value == 1) {
          this.previousEventList.push(coinHead);
        } else {
          this.previousEventList.push(coinTail);
        }
      });

      setTimeout(() => {
        var chatHistory = document.getElementById("item-box");
        if (chatHistory) {
          console.log("meesage scrol");
          chatHistory.scrollLeft = chatHistory.scrollWidth;
        }
      }, 50);
    });

    this.backendService.listen('previousWheelResults').subscribe(previous => {
      console.log('wheel');
      console.log(previous);
      let previousResponse = previous as Array<string>;
      this.previousEventList = [];
      previousResponse.forEach(value => {
        this.previousEventList.push(this.getWheelResultImage(value));
      });
      setTimeout(() => {
        var chatHistory = document.getElementById("item-box");
        if (chatHistory) {
          console.log("meesage scrol");
          chatHistory.scrollLeft = chatHistory.scrollWidth;
        }
      }, 50);
    });

    this.backendService.listen('previousLineResults').subscribe(previous => {
      console.log('line');
      console.log(previous);
      let previousResponse = previous as Array<number>;
      this.previousEventList = [];
      previousResponse.forEach(value => {
        this.previousEventList.push(this.getLineResultImage(value));
      });
      setTimeout(() => {
        var chatHistory = document.getElementById("item-box");
        if (chatHistory) {
          console.log("meesage scrol");
          chatHistory.scrollLeft = chatHistory.scrollWidth;
        }
      }, 50);
    });
  }

  getLineResultImage(resultNumber: number): string {
    switch (resultNumber) {
      case 0:
        return zeroResult;
      case 1:
        return oneResult;
      case 1.5:
        return oneFiveResult;
      case 2:
        return twoResult;
      case 4:
        return fourResult;
      case 10:
        return tenResult;
      default:
        return '';
    }
  }

  getWheelResultImage(resultnumber: string): string {
    switch (resultnumber) {
      case '1':
        return wheelResult1;
      case '2':
        return wheelResult2;
      case '3':
        return wheelResult3;
      case '4':
        return wheelResult4;
      case '5':
        return wheelResult5;
      case '6':
        return wheelResult6;
      case '7':
        return wheelResult7;
      case '8':
        return wheelResult8;
      case '9':
        return wheelResult9;
      case '10':
        return wheelResult10;
      case '11':
        return wheelResult11;
      case '12':
        return wheelResult12;
      case '13':
        return wheelResult13;
      case '14':
        return wheelResult14;
      case '15':
        return wheelResult15;
      case '16':
        return wheelResult16;
      case '17':
        return wheelResult17;
      case '18':
        return wheelResult18;
      case 'W':
        return wheelResultW;
      case 'X':
        return wheelResultX;
      default:
        return '';
    }
  }

}
