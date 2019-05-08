import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { MovieListService } from '../movie-list.service';
import { MovieList } from '../movie-list';
import { MovieService } from '../movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  loggedUsername:string;

  @Input('movieList')
  movieList:MovieList = new MovieList();

  movies: any[];

  constructor(private userService:UserService, private movieListService : MovieListService, private movieService: MovieService ) { }

  ngOnInit() {
  //  return the movie list based on logged in user
  this.loggedUsername = this.userService.getLoggedInUser().username;
   this.movieListService.getUsersLists(this.loggedUsername).subscribe(data =>{
    // this.userMovieList = data;
    this.movies = [];
    this.movieList.movieIds.forEach( movieId => {
      this.movieService.getMovieById(movieId).subscribe(data => {
        this.movies.push(data.movie);
      })
    });
   });
  }
  removeFromList(id, movieId){
    this.movieListService.deleteMovieFromList(id, movieId).subscribe();
  }
}
