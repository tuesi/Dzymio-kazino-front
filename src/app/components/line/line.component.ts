import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  itemList: string[] = [];
  oneX: string = '../../../assets/1X.png';
  zeroX: string = '../../../assets/0X.png';
  oneFiveX: string = '../../../assets/1,5X.png';
  twoX: string = '../../../assets/2X.png';
  fourX: string = '../../../assets/4X.png';
  tenX: string = '../../../assets/10X.png';

  itemCollection = [this.zeroX, this.oneX, this.oneFiveX, this.twoX, this.fourX, this.tenX];
  itemValues = [0, 1, 1.5, 2, 4, 10];
  lineList: number[] = [];

  @Output() loadingComplete = new EventEmitter();

  @ViewChild('itemListComponent')
  private itemListComponent: ElementRef;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('lineSet').subscribe(lineValues => {
      this.lineList = [];
      this.lineList = lineValues as Array<number>;
      this.itemListComponent.nativeElement.style.transition = 'none';
      this.itemListComponent.nativeElement.style.transform = `translateX(${(-85)}%)`;
      setTimeout(() => {
        this.itemListComponent.nativeElement.style.transition = 'all ease-out 5s';
      }, 20);
      this.itemList = [];
      this.lineList.forEach(element => {
        this.itemList.push(this.itemCollection[this.itemValues.indexOf(element)]);
      });
    });

    this.backendService.listen('linePos').subscribe(linePos => {
      this.spin(linePos as number);
    });

    this.backendService.listen('initialLinePos').subscribe(linePos => {
      this.itemListComponent.nativeElement.style.transition = 'none';
      this.itemListComponent.nativeElement.style.transform = `translateX(-${(linePos)}%)`;
      setTimeout(() => {
        this.itemListComponent.nativeElement.style.transition = 'all ease-out 5s';
        this.loadingComplete.emit('line');
      }, 20);
    });
  }

  spin(spinPos: number) {
    this.itemListComponent.nativeElement.style.transform = `translateX(-${(spinPos)}%)`;
  }
}
