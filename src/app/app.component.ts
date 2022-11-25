import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './services/user/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jimmy\'s Casino';
  showUserHeader = false;
  constructor(private userDataService: UserDataService, private router: Router) {
    userDataService.init();
  }

  hasRoute(): boolean {
    return !this.router.url.includes('login') && !this.router.url.includes('unauthorized');
  }
}
