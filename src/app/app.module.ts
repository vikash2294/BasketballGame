import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeamMatchDetailComponent } from './team-match-detail/team-match-detail.component';
import { TeamMatchListComponent } from './team-match-list/team-match-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamMatchDetailComponent,
    TeamMatchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
