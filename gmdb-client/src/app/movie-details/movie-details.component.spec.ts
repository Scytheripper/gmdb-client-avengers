import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieService } from '../movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from '../review.service';
import { UserService } from '../user.service';

class MockMovieService {
  getMovieBYID(){
    return {
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
      "Ratings": [{
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      }, {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      }, {
        "Source": "Metacritic",
        "Value": "69/100"
      }],
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
    }
  }

  getMovieById(){
    return of({
      movie:{
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
      "Ratings": [{
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      }, {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      }, {
        "Source": "Metacritic",
        "Value": "69/100"
      }],
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
    }
  });
  }
}
class MockUserService {
  getLoggedInUser(){
    return {username: "username"}
  }
}
class MockReviewService {
  getReviewsForMovie(){ return new Observable<any>(); }
}
describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {
          params: of({movieId: 'something'})
        }},
        {provide: MovieService, useClass:MockMovieService},
        {provide: ReviewService, useClass:MockReviewService},
        {provide: UserService, useClass:MockUserService}
      ],
    
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load in with a movie', () => {
    expect(component.movie.Title).toEqual('The Avengers');
  });
});
