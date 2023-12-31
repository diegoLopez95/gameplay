import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';

const routes: Routes = [
  { path: '', component:DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: GamesDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
