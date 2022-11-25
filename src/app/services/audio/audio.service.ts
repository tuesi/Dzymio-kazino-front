import { Injectable } from '@angular/core';

const cyruVyruSound = "/assets/audio/cyruVyru.wav";
const debilsSound = "/assets/audio/debils.wav";
const nepaejoSound = "/assets/audio/nepaEjo.wav";
const troskinySound = "/assets/audio/troskiny.wav";
const hayahSound = "/assets/audio/hayah.wav";
const citybeeSound = "/assets/audio/citybee.wav";

const loseSoundList = [debilsSound, nepaejoSound, troskinySound];
const winSoundList = [cyruVyruSound, hayahSound, citybeeSound];

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audio = new Audio();

  constructor() { }

  playLoseSound() {
    let randomSound = Math.floor(Math.random() * loseSoundList.length);
    this.audio.src = loseSoundList[randomSound];

    this.audio.load();
    this.audio.play();
  }

  playWinSound() {
    let randomSound = Math.floor(Math.random() * winSoundList.length);
    this.audio.src = winSoundList[randomSound];

    this.audio.load();
    this.audio.play();
  }

  playNepaejo() {
    this.audio.src = nepaejoSound;

    this.audio.load();
    this.audio.play();
  }

}
