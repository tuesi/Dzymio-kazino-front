import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-line-game',
  templateUrl: './line-game.component.html',
  styleUrls: ['./line-game.component.scss']
})
export class LineGameComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.joinRoom('line');
  }

}
