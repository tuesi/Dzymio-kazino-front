import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-member-buy',
  templateUrl: './member-buy.component.html',
  styleUrls: ['./member-buy.component.scss']
})
export class MemberBuyComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MemberBuyComponent>) { }

  ngOnInit(): void { }
}
