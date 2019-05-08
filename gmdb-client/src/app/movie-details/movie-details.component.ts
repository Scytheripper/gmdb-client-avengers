import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { MovieListService } from '../movie-list.service';
import { MovieList } from '../movie-list';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id:string;
  movie;
  addReviewForm : FormGroup;
  reviewArr;
  reviewObj : Review;
  usersLists;


  @Input()
  passedVari: Movie[];

  constructor(private route: ActivatedRoute, private movieService: MovieService
    , private fb:FormBuilder,private userService: UserService, private reviewService: ReviewService, private movieListService: MovieListService) { }

  ngOnInit() {
    console.log(this.userService.getLoggedInUser());
     //initailise form
     this.addReviewForm = this.fb.group({
      reviewTitle:['', Validators.required],
      reviewComment:['', Validators.required],
    });

    this.route.params.subscribe(({movieId}) => this.id = movieId);
    //this.movie = this.movieService.getMovieBYID(this.id);
    this.movieService.getMovieById(this.id).subscribe(data => {
      this.movie = data.movie;
    });

    this.reviewService.getReviewsForMovie(this.id).subscribe(data => {
      console.log(data);
      this.reviewArr = data;
    });
    this.movieListService.getUsersLists(this.userService.getLoggedInUser().username).subscribe( data => {
      this.usersLists = data;
    });
  }

  addReview(){
    console.log("reviewTitle:"+this.addReviewForm.controls.reviewTitle.value);
    console.log("reviewComment:"+this.addReviewForm.controls.reviewComment.value)
    console.log("userId:"+this.userService.getLoggedInUser());
    console.log("movieId:"+this.id);
    let title = this.addReviewForm.controls.reviewTitle.value;
    let comment = this.addReviewForm.controls.reviewComment.value;
    console.log(this.userService.loggedInUser);
    let userId = this.userService.getLoggedInUser().email;
    console.log("userId---+"+userId);
    let movieId = this.id;
    this.reviewObj = new Review();
    this.reviewObj.ReviewTitle = title;
    this.reviewObj.Email=userId;
    this.reviewObj.ReviewComment = comment;
    this.reviewObj.MovieId = movieId;
    this.reviewArr.push(this.reviewObj);
    localStorage.setItem('reviews',JSON.stringify(this.reviewArr));
  }

  submitReview(){
    console.log(this.userService.getLoggedInUser());
    this.reviewService.submitReview({
      movieId: this.id,
      email: this.userService.getLoggedInUser().email,
      description: this.addReviewForm.controls.reviewComment.value,
      title: this.addReviewForm.controls.reviewTitle.value
    }).subscribe();
  }

  addToList(id, movieId){
    this.movieListService.addMovieToList(id, movieId).subscribe();
  }

  removeFromList(id, movieId){
    this.movieListService.deleteMovieFromList(id, movieId).subscribe();
  }

}
