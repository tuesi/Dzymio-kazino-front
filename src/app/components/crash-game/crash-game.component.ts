import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-crash-game',
  templateUrl: './crash-game.component.html',
  styleUrls: ['./crash-game.component.scss']
})
export class CrashGameComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.joinRoom('crashRoom');
  }

}
