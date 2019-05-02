import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';



@NgModule({
  declarations: [
    AppComponent,
    AccountDetailComponent,
    HomeComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
