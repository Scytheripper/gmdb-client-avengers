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
  users = JSON.parse(localStorage.getItem('users'));

  constructor(private http: HttpClient) { }

  login(username,password):boolean {
    let results = this.users.filter(user => user.username === username && user.password === password);
    if(results.length === 0) {
      return false;
    }
    else{
      this.loggedInUser = results[0];
    }
     this.http.get<User>(environment.API_URL).subscribe();
     this.loggedInUser = results[0];
     return true;
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  updateUser(user: User) {
    this.users = [user];
    localStorage.setItem('users', JSON.stringify(this.users));
    this.http.put(environment.API_URL, user).subscribe();
  }

  signup(user: User) {
    //STORE THE USER IN LOCAL STORAGE FOR NOW 
    console.log(JSON.parse(localStorage.getItem('users')));
    if(JSON.parse(localStorage.getItem('users')) === null){
      this.users = [];
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    ///////////////////////////////////////////////////////////

    this.http.post(environment.API_URL, user).subscribe();

    console.log('User signed up');
  }
}
