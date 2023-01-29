import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinGameComponent } from './components/coin-game/coin-game.component';
import { CrashGameComponent } from './components/crash-game/crash-game.component';
import { LineGameComponent } from './components/line-game/line-game.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { WheelGameComponent } from './components/wheel-game/wheel-game.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [AuthGuard], pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wheel',
    component: WheelGameComponent,
    canActivate: [AuthGuard]
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
  },
  {
    path: 'top',
    component: LeaderboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
