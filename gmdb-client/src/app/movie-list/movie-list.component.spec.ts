import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { MovieListService } from '../movie-list.service';
import { MovieList } from '../movie-list';
import { Observable,of } from 'rxjs';
import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { RouterTestingModule } from '@angular/router/testing';

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

class MockMovieService {
  getMovieById(){
    return of(    {
      "Title": "The Avengers",
      "Year": "2012",
      "Rated": "PG-13",
      "Released": "04 May 2012",
      "Runtime": "143 min",
      "Genre": "Action, Adventure, Sci-Fi",
      "Director": "Joss Whedon",
      "Writer": "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
      "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
      "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      "Language": "English, Russian, Hindi",
      "Country": "USA",
      "Awards": "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "8.1/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "92%"
        },
        {
          "Source": "Metacritic",
          "Value": "69/100"
        }
      ],
      "Metascore": "69",
      "imdbRating": "8.1",
      "imdbVotes": "1,165,317",
      "imdbID": "tt0848228",
      "Type": "movie",
      "DVD": "25 Sep 2012",
      "BoxOffice": "$623,279,547",
      "Production": "Walt Disney Pictures",
      "Website": "http://marvel.com/avengers_movie",
      "Response": "True"
    });
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
        {provide: MovieListService, useClass: MockMovieListService},
        {provide: MovieService, useClass: MockMovieService}
      ],
      imports:[RouterTestingModule]
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

