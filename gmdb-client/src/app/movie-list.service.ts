import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieList } from './movie-list';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }

  createMovieList(name, username):Observable<MovieList> {
    return this.http.post<MovieList>('http://localhost:8082/movie-list/createMovieList', {name, username});
  }

  addMovieToList(id: number, movieId: string): Observable<any> {
    return this.http.put(`http://localhost:8082/movie-list/putMovie?id=${id}&movieId=${movieId}`,{});
  }

  deleteMovieFromList(id: number, movieId: string): Observable<any> {
    return this.http.delete(`http://localhost:8082/movie-list/deleteMovie?id=${id}&movieId=${movieId}`);
  }

  deleteMovieList(id){
    return this.http.delete(`http://localhost:8082/movie-list/deleteMovieList?id=${id}`);
  }

  getUsersLists(username): Observable<MovieList[]>{
    return this.http.get<MovieList[]>(`http://localhost:8082/movie-list/getUsersLists?username=${username}`);
  }
}
