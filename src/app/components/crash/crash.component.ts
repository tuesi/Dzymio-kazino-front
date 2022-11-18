import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-crash',
  templateUrl: './crash.component.html',
  styleUrls: ['./crash.component.scss']
})
export class CrashComponent implements OnInit {

  crashNumber = 1.00;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('crashValue').subscribe(crashValue => {
      this.crashNumber = crashValue as number;
    });
  }

}
