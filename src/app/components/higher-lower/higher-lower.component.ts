import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-higher-lower',
  templateUrl: './higher-lower.component.html',
  styleUrls: ['./higher-lower.component.scss']
})
export class HigherLowerComponent implements OnInit {

  number = 50;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('higherLowerValue').subscribe(higherLowerValue => {
      this.number = higherLowerValue as number;
    });
  }

}
