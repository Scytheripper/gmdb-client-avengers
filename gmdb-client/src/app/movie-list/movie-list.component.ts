import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { MovieListService } from '../movie-list.service';
import { MovieList } from '../movie-list';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  loggedUsername:string;

  @Input()
  movieList:MovieList;

  constructor(private userService:UserService, private movieListSerice : MovieListService ) { }

  ngOnInit() {
  //  return the movie list based on logged in user
  this.loggedUsername = this.userService.getLoggedInUser().username;
   this.movieListSerice.getUsersLists(this.loggedUsername).subscribe(data =>{
    // this.userMovieList = data;
   });


  }

}
