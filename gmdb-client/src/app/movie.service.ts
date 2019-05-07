import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { movies } from '../assets/movies-data.json';
import { Movie, Rating } from './movie.js';
import { environment } from 'src/environments/environment.js';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesValue: Movie[];
  movieList = movies;
  private postsURL = 'http://localhost:4200/assets/movies-data.json';
  searchedMovie;

  constructor(private httpclient: HttpClient) {

  }

  getMovies(): Observable<Movie[]> {
    return this.httpclient.get<Movie[]>('http://localhost:4200/assets/movies-data.json');
  }


  getMoviesByTitle(title: string): Movie[] {

    let movieInfo;
    movieInfo = movies.map(function (movie) {
      if (movie.Title.includes(title)) {
        return movie;
      }
    });
    return movieInfo;
  }

  getMovieBYID(id:string) {

    return this.movieList.filter(f => f.imdbID === id)[0];

  }

  //NEW API USAGE////////////////////////////////////////////////////////////////
  getAllMovies(): Observable<any> {
    return this.httpclient.get<any>(`${environment.movie_api_url}/search/%20`);
  }

  searchMovie(keyword): Observable<any> {
    return this.httpclient.get<any>(`${environment.movie_api_url}/search/${keyword}`);
  }

  getMovieById(id):Observable<any>{
    return this.httpclient.get<any>(`${environment.movie_api_url}/detail/${id}`);
  }
}


