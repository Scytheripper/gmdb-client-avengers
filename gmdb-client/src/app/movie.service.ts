import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.js';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  
  constructor(private httpclient: HttpClient) { 
    
  }

  getMovies(): Observable<Movie[]>{
    return this.httpclient.get<Movie[]>('http://localhost:4200/assets/movies-data.json');
  }

  getMoviesByTitle() {
    //TODO method
  }
}
