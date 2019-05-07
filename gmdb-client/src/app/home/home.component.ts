import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[];
  movieSearchForm : FormGroup;
  movieResults:[];
  defaultResult:Movie[];

 

  constructor(private movieService:MovieService , private fb:FormBuilder) { }

  ngOnInit() {
    //initailise form
    this.movieSearchForm = this.fb.group({
       searchCriteria :['']
    })
    //this.getDefaultMovieList();
    this.movieService.getAllMovies().subscribe(data => {
      console.log(data);
      this.movieResults = data.movies;
    });
  }

  getDefaultMovieList(){

    this.movieService.getMovies().
    subscribe(movieList => {
      this.movieResults = movieList['movies']
    });  
  }

  renderSearch(){
    //Todo Search    
    if(this.movieSearchForm.value.searchCriteria === ""  || 
        null == this.movieSearchForm.value.searchCriteria){
          this.movieService.getMovies().
             subscribe(movieList => this.movies=movieList);
             this.movieResults=this.movies['movies'];

        }
    else{
      this.movieService.getMovies().
      subscribe(movieList => {
        this.movieResults = movieList['movies'].
        filter(movie => movie.Title.toLowerCase().includes(this.movieSearchForm.controls.searchCriteria.value.toLowerCase()));
      });
      
    } 
  }

  searchForMovies(){
    if(this.movieSearchForm.value.searchCriteria === ""  || 
    null == this.movieSearchForm.value.searchCriteria){
      this.movieService.getAllMovies().subscribe(data => {
        this.movieResults = data.movies;
      });
    }
    else{
      this.movieService.searchMovie(this.movieSearchForm.controls.searchCriteria.value).subscribe(data => {
        this.movieResults = data.movies;
      });
    }

  }


}
