import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  {path: 'accountDetails', component: AccountDetailComponent},
  {path: 'home',component:HomeComponent},
<<<<<<< HEAD
  {path: 'movieDetails',component:MovieDetailsComponent}
=======
  {path: 'movieDetails',component:MovieDetailsComponent},
  {path: 'signup', component: SignupComponent},
>>>>>>> d4a8bf52bee735eeb3ccffd14df6a498e3269bc8
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
