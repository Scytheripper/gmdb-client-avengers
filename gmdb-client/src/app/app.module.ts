import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AccountDetailComponent,
    HomeComponent,
    MovieDetailsComponent,
    LoginComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
