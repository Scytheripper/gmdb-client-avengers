import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService:MovieService) { }

  ngOnInit() {
    this.getDefaultMovieList();
  }

  getDefaultMovieList(){
    return this.movieService.getMovies().subscribe(movieList => {
      this.movies = movieList;
    })
  }

}
