import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WheelComponent } from './components/wheel/wheel.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { BackendService } from './services/backend/backend.service';
import { MessagesComponent } from './components/messages/messages.component';
import { BetComponent } from './components/bet/bet.component';
import { TimerComponent } from './components/timer/timer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { WheelGameComponent } from './components/wheel-game/wheel-game.component';
import { CoinGameComponent } from './components/coin-game/coin-game.component';
import { LineGameComponent } from './components/line-game/line-game.component';
import { CrashGameComponent } from './components/crash-game/crash-game.component';
import { CoinComponent } from './components/coin/coin.component';
import { PreviousResultsComponent } from './components/previous-results/previous-results.component';
import { CoinBetComponent } from './components/coin-bet/coin-bet.component';
import { LineComponent } from './components/line/line.component';
import { CrashComponent } from './components/crash/crash.component';
import { CrashBetComponent } from './components/crash-bet/crash-bet.component';
import { UserDataService } from './services/user/user-data.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HigherLowerGameComponent } from './components/higher-lower-game/higher-lower-game.component';
import { HigherLowerComponent } from './components/higher-lower/higher-lower.component';
import { RockPeperScissorsGameComponent } from './components/rock-peper-scissors-game/rock-peper-scissors-game.component';
import { RockPeperScissorsComponent } from './components/rock-peper-scissors/rock-peper-scissors.component';
import { HigherLowerBetComponent } from './components/higher-lower-bet/higher-lower-bet.component';
import { MemberShopListComponent } from './components/member-shop-list/member-shop-list.component';
import { MemberBuyComponent } from './components/member-buy/member-buy.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MemberInfoComponent } from './components/member-info/member-info.component';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    MainComponent,
    MessagesComponent,
    BetComponent,
    TimerComponent,
    PaymentComponent,
    LoginComponent,
    UserInfoComponent,
    WheelGameComponent,
    CoinGameComponent,
    LineGameComponent,
    CrashGameComponent,
    CoinComponent,
    PreviousResultsComponent,
    CoinBetComponent,
    LineComponent,
    CrashComponent,
    CrashBetComponent,
    UnauthorizedComponent,
    LeaderboardComponent,
    HigherLowerGameComponent,
    HigherLowerComponent,
    RockPeperScissorsGameComponent,
    RockPeperScissorsComponent,
    HigherLowerBetComponent,
    MemberShopListComponent,
    MemberBuyComponent,
    MemberInfoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [BackendService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
