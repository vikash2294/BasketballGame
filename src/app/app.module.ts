import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TeamMatchDetailComponent } from './team-match-detail/team-match-detail.component';
import { TeamMatchListComponent } from './team-match-list/team-match-list.component';
import { LoaderComponent } from './loader/loader.component';
import { LoadingService } from './services/loading.service';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TeamMatchDetailComponent,
    TeamMatchListComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoadingService,
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true}],
    bootstrap: [AppComponent],
})
export class AppModule { }
