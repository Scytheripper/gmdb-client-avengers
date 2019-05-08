import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { MovieListService } from '../movie-list.service';
import { MovieList } from '../movie-list';
import { Observable,of } from 'rxjs';


class MockUserService {
  loggedInUser =  {
    id: 1,
    username: "guest",
    name: "name",
    password: "password",
    email: "email@email.com" 
  }
  updateUser(user: User) {

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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListComponent ],
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
