import { TestBed } from '@angular/core/testing';

import { MovieListService } from './movie-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieList } from './movie-list';

let httpTestingController: HttpTestingController;
let service: MovieListService;

describe('MovieListService', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MovieListService);
  });

afterEach(() => {
  httpTestingController.verify();
});
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a list with a name and username', () => {
    const mockList = {
      id: 1,
      name: "Movie List",
      username: "Jon",
      movieIds: []
    };

    service.createMovieList("Movie List", "Jon")
      .subscribe(movieList => {
        expect(movieList.name).toEqual("Movie List");
        expect(movieList.movieIds).toEqual([]);
      });

      const req = httpTestingController.expectOne('http://localhost:8082/movie-list/createMovieList');

      expect(req.request.method).toEqual('POST');

      req.flush(mockList);
  });

  it('should allow user to add movie to a list', () => {
    let id=1;
    let movieId="abc123";
    service.addMovieToList(id, movieId).subscribe(data => console.log(data));

    const req = httpTestingController.expectOne(`http://localhost:8082/movie-list/putMovie?movieListId=${id}&movieId=${movieId}`);

    expect(req.request.method).toEqual('PUT');
  });

  it('should allow user to delete movie from a list', () => {
    let id=1;
    let movieId="abc123";
    service.deleteMovieFromList(id, movieId).subscribe(data => console.log(data));

    const req = httpTestingController.expectOne(`http://localhost:8082/movie-list/deleteMovie?movieListId=${id}&movieId=${movieId}`);

    expect(req.request.method).toEqual('DELETE');
  });

  it('should allow user to delete a list', () => {
    let id=1;
    service.deleteMovieList(id).subscribe(data => console.log(data));

    const req = httpTestingController.expectOne(`http://localhost:8082/movie-list/deleteMovieList?movieListId=${id}`);

    expect(req.request.method).toEqual('DELETE');
  });

  it('should retrive lists by username', () => {
    let username='Jon';
    let mockLists = [
      {
        id: 1,
        name: 'Favorites',
        username: "Jon",
        movieIds: []
      },
      {
        id: 2,
        name: 'Hated',
        username: 'Jon',
        movieIds: []
      }
    ];

    service.getUsersLists(username).subscribe(lists => {
      expect(lists.length).toEqual(2);
      lists.forEach(list => {
        expect(list.username === username);
      });
    });

    const req = httpTestingController.expectOne(`http://localhost:8082/movie-list/getUsersLists?username=${username}`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockLists);
  });
});
