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

  constructor(private http: HttpClient) { }

  login(username,password):Observable<User> {
    return this.http.get<User>(environment.API_URL);
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
    this.http.post(environment.API_URL, user).subscribe();
  }
}
