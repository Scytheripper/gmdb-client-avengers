import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: User;

  constructor(private http: HttpClient) { }

  login(username,password):Observable<User> {
    return this.http.get<User>('http://localhost:4200/assets/users.json');
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  updateUser(user: User) {
    this.http.put('http://localhost:4200/assets/users.json', user).subscribe();
  }

  signup(user: User) {
    this.http.post('http://localhost:4200/assets/users.json', user).subscribe();
  }
}
