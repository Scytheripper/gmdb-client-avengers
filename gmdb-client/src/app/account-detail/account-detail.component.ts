import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieList } from '../movie-list';
import { MovieListService } from '../movie-list.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  user: User;
  changingPassword = false;
  passwordForm: FormGroup;
  movieLists: MovieList[];

  constructor(private userService: UserService, private fb: FormBuilder, private movieListService: MovieListService) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.minLength(6), Validators.required]]
    });
    this.user = this.userService.getLoggedInUser();

    //TEMP USER TO REFLECT USE
    this.user = {
      id: 1,
      username: "guest",
      password: "password",
      email: "email@email.com" 
    }  
    this.userService.loggedInUser = this.user;
    //////////////////////////

    this.user = this.userService.getLoggedInUser();
    this.movieListService.getUsersLists(this.user.username).subscribe(movieLists => this.movieLists =  movieLists);
  }

  toggleChangingPassword() {
    this.changingPassword = !this.changingPassword;
  }

  //return true on success
  changePassword():boolean {
    if(this.passwordForm.valid){
      this.user.password = this.passwordForm.controls.newPassword.value;
      this.userService.updateUser(this.user);// tell the service to update on the backend!
      return true;
    }
    else{
      return false;
    }
  }

}
