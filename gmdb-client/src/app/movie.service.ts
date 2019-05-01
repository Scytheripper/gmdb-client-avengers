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

  // getMoviesByTitle(title): Observable<Movie[]>{
  //   return this.httpclient.get<Movie[]>('http://localhost:4200/assets/movies-data.json/' + title);
  // }

  getMoviesByTitle(title: string){  
    let movie :Movie[]
     this.getMovies()
     .subscribe(movies => {
          movie = movies.filter(m=>m.Title=title).map(m=>m);
     })
     return movie;
}

  
}
