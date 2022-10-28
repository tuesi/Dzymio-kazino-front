import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';
import { CoinComponent } from './coin/coin.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FormsModule } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { MessagesComponent } from './messages/messages.component';
import { BetComponent } from './bet/bet.component';
import { TimerComponent } from './timer/timer.component';
import { PaymentComponent } from './payment/payment.component';

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
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
