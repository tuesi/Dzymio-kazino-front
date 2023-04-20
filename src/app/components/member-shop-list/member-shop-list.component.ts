import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberBuyComponent } from '../member-buy/member-buy.component';

@Component({
  selector: 'app-member-shop-list',
  templateUrl: './member-shop-list.component.html',
  styleUrls: ['./member-shop-list.component.scss']
})
export class MemberShopListComponent {
  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(MemberBuyComponent, {
      panelClass: 'dialog-background',
      data: { message: 'Ar norite prenumeruoti?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        // User confirmed action
      }
    });
  }
}
