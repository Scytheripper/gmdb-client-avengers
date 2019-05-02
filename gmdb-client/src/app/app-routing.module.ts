import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'accountDetails', component: AccountDetailComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
