import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WheelComponent } from './components/wheel/wheel.component';
import { CoinComponent } from './components/coin/coin.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FormsModule } from '@angular/forms';
import { BackendService } from './services/backend/backend.service';
import { MessagesComponent } from './components/messages/messages.component';
import { BetComponent } from './components/bet/bet.component';
import { TimerComponent } from './components/timer/timer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { WheelGameComponent } from './components/wheel-game/wheel-game.component';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    CoinComponent,
    ListComponent,
    MainComponent,
    MessagesComponent,
    BetComponent,
    TimerComponent,
    PaymentComponent,
    LoginComponent,
    UserInfoComponent,
    WheelGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
