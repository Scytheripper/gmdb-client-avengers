import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieList } from './movie-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }

  createMovieList(name, username):Observable<MovieList> {
    return this.http.post<MovieList>(environment.movie_list_api_url + '/createMovieList', {name, username});
  }

  addMovieToList(id: number, movieId: string): Observable<any> {
    return this.http.put(`${environment.movie_list_api_url}/putMovie?movieListId=${id}&movieId=${movieId}`,{});
  }

  deleteMovieFromList(id: number, movieId: string): Observable<any> {
    return this.http.delete(`${environment.movie_list_api_url}/deleteMovie?movieListId=${id}&movieId=${movieId}`);
  }

  deleteMovieList(id){
    return this.http.delete(`${environment.movie_list_api_url}/deleteMovieList?movieListId=${id}`);
  }

  getUsersLists(username): Observable<MovieList[]>{
    return this.http.get<MovieList[]>(`${environment.movie_list_api_url}/getUsersLists?username=${username}`);
  }
}
