import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinGameComponent } from './components/coin-game/coin-game.component';
import { CrashGameComponent } from './components/crash-game/crash-game.component';
import { LineGameComponent } from './components/line-game/line-game.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { WheelGameComponent } from './components/wheel-game/wheel-game.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wheel',
    component: WheelGameComponent
  },
  {
    path: 'coin',
    component: CoinGameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: LineGameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crash',
    component: CrashGameComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
