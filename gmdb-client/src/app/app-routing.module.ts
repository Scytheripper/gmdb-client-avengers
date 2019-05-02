import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full'
  },
  {path: 'accountDetails', component: AccountDetailComponent},
  {path: 'home',component:HomeComponent},
  {path: 'movieDetails/:movieId',component:MovieDetailsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', component: HomeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
