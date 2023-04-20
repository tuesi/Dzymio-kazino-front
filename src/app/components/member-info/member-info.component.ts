import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UserInfoComponent>) { }

  currentDate = new Date();

  memberStartDate: String;

  ngOnInit(): void { this.getDate(); }

  getDate(): void {
    const year = this.currentDate.getFullYear(); // Get the year (e.g. 2023)
    const month = this.currentDate.getMonth() + 1; // Get the month (0-11), add 1 to get the month (e.g. 4 for April)
    const date = this.currentDate.getDate(); // Get the day of the month (1-31)
    this.memberStartDate = year + '-' + month + '-' + date;
  }
}
