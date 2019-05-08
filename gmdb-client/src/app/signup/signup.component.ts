import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      name: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  signupUser() {
    if(this.signupForm.valid) {
      let user = new User();
      user.name = this.signupForm.controls.name.value;
      user.email = this.signupForm.controls.email.value;
      user.username = this.signupForm.controls.username.value;
      user.password = this.signupForm.controls.password.value;
      this.userService.signupAuth(user).subscribe();
      this.router.navigateByUrl('/login');
      console.log('User added');
      return true;
    }
    else {
      return false;
    }
  }

}
