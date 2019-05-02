import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MovieService } from './movie.service';
import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Subscriber } from 'rxjs';



describe('MovieService', () => {

  // let mockMovieService: MockMovieService;
  let movieService: MovieService;
  let movieMockData =
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
    }]





  let injector: TestBed;
  let httpMock: HttpTestingController;



  beforeEach(() => TestBed.configureTestingModule({
    providers: [MovieService],
    imports: [HttpClientTestingModule],
  }));


  afterEach(()=>{
    httpMock.verify();

  })

  beforeEach(() => {
    injector = getTestBed();
    movieService = injector.get(MovieService);
    httpMock = injector.get(HttpTestingController);
  })

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should have getMovies Method', () => {
    expect(movieService.getMovies).toBeTruthy;
  })

  it('should have getMoviesByName Method', () => {
    expect(movieService.getMoviesByTitle).toBeTruthy;
  })


  it('should make http GET call and get all movies', () => {

    movieService.getMovies().subscribe(movies => {

      expect(movies.length).toBe(1);
      expect(movies[0].Title).toEqual('The Avengers');
    });

    const req = httpMock.expectOne('http://localhost:4200/assets/movies-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(movieMockData);

  })

  it('should get movie by title', () => {
    let title='Avengers'
    //const req = httpMock.expectOne('http://localhost:4200/assets/movies-data.json');
    let result;
    result =movieService.getMovies().
    subscribe(movieList => {
      this.movieResults = movieList['movies'].
      filter(movie => {
        result=movie.Title.toLowerCase().includes(title.toLowerCase());
      });
      expect(result).toContain('Avengers');

      
    });



    });

 

});
