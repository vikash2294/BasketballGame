import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMatchDetailComponent } from './team-match-detail/team-match-detail.component';
import { TeamMatchListComponent } from './team-match-list/team-match-list.component';

const routes: Routes = [
  { path: '', component: TeamMatchListComponent },
  { path: 'results/:teamCode', component: TeamMatchDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
