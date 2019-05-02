import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MovieService } from '../movie.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Movie } from '../movie';
import { Observable, of } from 'rxjs';



class MockMovieService{

  tempMovieData: Movie[];
  movieMockData =
  [
    {
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
    }];




  constructor (){
    this.tempMovieData = this.movieMockData;
  }
  getMovies():Observable<Movie[]>{
     return of(this.movieMockData)  ;
  }
  
  getMoviesByTitle(title: string):Observable<Movie[]>{ 
    if(this.movieMockData[0].Title.includes(title))
        return of(this.movieMockData);
    else
       return of(this.movieMockData)  ;
  }

}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockMovieService:MockMovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: MovieService,useClass: MockMovieService}
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockMovieService = new MockMovieService();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  
  it('should display all Movies when no search condition exist', () => {
    let actual = mockMovieService.getMovies();
    expect(actual instanceof Observable).toBeTruthy;
  });


});
