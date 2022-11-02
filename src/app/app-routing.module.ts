import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinComponent } from './components/coin/coin.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { WheelComponent } from './components/wheel/wheel.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main', 
  component: MainComponent,
  canActivate: [AuthGuard]},
  {path: 'wheel',
  component: WheelComponent},
  {path: 'coin', 
  component: CoinComponent,
  canActivate: [AuthGuard]},
  {path: 'list', 
  component: ListComponent,
  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
