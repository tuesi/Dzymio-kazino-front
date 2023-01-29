import { Component, OnInit } from '@angular/core';
import { parse } from 'path';
import { LeaderboardDataModel } from 'src/app/models/leaderboardData.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  displayedColumnsMain: string[] = ['position', 'name', 'won', 'lost', 'amount'];
  displayedColumnsWon: string[] = ['position', 'name', 'won'];
  displayedColumnsLost: string[] = ['position', 'name', 'lost'];

  leaderboardMain: LeaderboardDataModel[];
  leaderboardWon: LeaderboardDataModel[];
  leaderboardLost: LeaderboardDataModel[];

  ngOnInit() {
    this.apiService.getLeaderboards().subscribe(data => {
      if (data) {
        this.leaderboardMain = [...data];
        this.leaderboardWon = [...data];
        this.leaderboardLost = [...data];

        this.leaderboardMain.forEach(data => {
          data.amount = data.won - data.lost;
        });

        this.leaderboardMain.sort((a, b) => (a.amount > b.amount) ? -1 : 1);
        this.leaderboardWon.sort((a, b) => (a.won > b.won) ? -1 : 1);
        this.leaderboardLost.sort((a, b) => (a.lost > b.lost) ? -1 : 1);
      }
    });
  }
}
