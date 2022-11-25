import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
  }

  playSound() {
    this.audioService.playNepaejo();
  }

}
