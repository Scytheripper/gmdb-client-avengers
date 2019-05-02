import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: User;

  //all of the users to store in local storage
  users = [];

  constructor(private http: HttpClient) { }

  login(username,password):boolean {
    //might need to change the 
    //let users=JSON.parse(localStorage.getItem('users'));
    console.log(this.users);
    let results = this.users.filter(user => user.username === username && user.password === password);
    console.log(results);
    if(results.length === 0) {
      console.log(results.length);
      return false;
    }
    else{
      this.loggedInUser = results[0];
    }
     this.http.get<User>(environment.API_URL).subscribe(user=>this.loggedInUser=user);
     return true;
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  updateUser(user: User) {
    this.http.put(environment.API_URL, user).subscribe();
  }

  signup(user: User) {
    //STORE THE USER IN LOCAL STORAGE FOR NOW 
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    ///////////////////////////////////////////////////////////

    this.http.post(environment.API_URL, user).subscribe();

    console.log('User signed up');
  }
}
