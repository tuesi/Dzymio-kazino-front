import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetComponent } from './bet/bet.component';
import { CoinComponent } from './coin/coin.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { WheelComponent } from './wheel/wheel.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'wheel', component: WheelComponent},
  {path: 'coin', component: CoinComponent},
  {path: 'list', component: ListComponent},
  {path: 'test', component: BetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
