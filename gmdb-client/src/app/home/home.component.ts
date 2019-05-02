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
    this.getDefaultMovieList();
  }

  getDefaultMovieList(){

    this.movieService.getMovies().
    subscribe(movieList => {
      this.movieResults = movieList['movies']
    });  
  }

  renderSearch(){
    //Todo Search    
    console.log("movie title---"+this.movieSearchForm.value.searchCriteria);
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


}
