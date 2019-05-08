import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder,private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm= this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
  });
  }

  loginUser(){
    let userName= this.loginForm.controls.userName.value;
    let password= this.loginForm.controls.password.value;

    this.userService.signinAuth(userName, password).subscribe( data => {
      this.userService.setLoggedInUser(data);
      localStorage.setItem('accessToken', data['accessToken']);
      this.router.navigateByUrl('/home');
    });
    //redirect to the home page
  }
}
