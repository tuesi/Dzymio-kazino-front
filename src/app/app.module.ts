import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    CrashBetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BackendService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
