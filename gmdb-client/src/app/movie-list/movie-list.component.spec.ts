import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { MovieListService } from '../movie-list.service';
import { MovieList } from '../movie-list';
import { Observable,of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: `app-account-detail`,
  template: `<movie-list></movie-list>`
})
class MockAccountDetails{
  movieList; 
  setInput(input){
    this.movieList = input;
  }
}

class MockUserService {
  loggedInUser =  {
    id: 1,
    username: "guest",
    name: "name",
    password: "password",
    email: "email@email.com" 
  }
  
  getLoggedInUser(){
    return this.loggedInUser;
  }
}

class MockMovieListService {

  movieList = [{"id":"1","name":"favorite","username":"guest","movieIds":["abc123","tty908"]}];

  getUsersLists(username:string):Observable<any>{
    //return new Observable<MovieList[]>();
    return of(this.movieList);
   }

}


describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let mockMovieListService: MockMovieListService;
  let accountDetailsFixture: ComponentFixture<MockAccountDetails>;
  let accountDetailsComponent: MockAccountDetails;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListComponent, MockAccountDetails ],
      providers: [
        {provide: UserService, useClass: MockUserService },
        {provide: MovieListService, useClass: MockMovieListService}
      ],
      imports:[]
    })
   .compileComponents();
  }));

  beforeEach(() => {
    mockMovieListService = new MockMovieListService();
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // component.movieList = {"id":1,"name":"favorite","username":"guest","movieIds":["abc123","tty908"]};
    component.movieList = new MovieList();
    console.log(component.movieList);
    fixture.detectChanges();

    accountDetailsFixture = TestBed.createComponent(MockAccountDetails);
    accountDetailsComponent = accountDetailsFixture.componentInstance;
    accountDetailsFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie-list for user', () => {
    let username = 'guest';
    let actual = mockMovieListService.getUsersLists(username);
    expect(actual instanceof Observable).toBeTruthy;
    
  });

});

