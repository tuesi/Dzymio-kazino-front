import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  time = 0;
  inProgress = false;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getTimeTillNextSpin().subscribe(data => {
      this.time = data;
      if (this.time <= 0) {
        this.inProgress = true;
      } else {
        this.inProgress = false;
      }
    })
  }

}
