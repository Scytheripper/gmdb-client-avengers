import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  signupUser() {
    if(this.signupForm.valid) {
      let user = new User();
      user.email = this.signupForm.controls.email.value;
      user.username = this.signupForm.controls.username.value;
      user.password = this.signupForm.controls.password.value;
      this.userService.signup(user);
      console.log('User added');
      return true;
    }
    else {
      return false;
    }
  }

}
