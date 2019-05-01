import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';


export class MockMovieService {
  constructor() { }
}

describe('MovieService', () => {

  // let mockMovieService: MockMovieService;
  let movieService: MovieService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [MovieService]
  }));

  beforeEach(() => {
    // mockMovieService = TestBed.get(MockMovieService);
    movieService = TestBed.get(MovieService);
  })

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should have getMovies Method', () => {
  expect(movieService.getMovies()).toBeTruthy;
  })

  it('should have getMoviesByName Method', () => {
    expect(movieService.getMoviesByName()).toBeTruthy;
    })
  

});
