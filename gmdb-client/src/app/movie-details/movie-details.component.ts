import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Review } from '../review';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id:string;
  movie;
  addReviewForm : FormGroup;
  reviewArr = [];
  reviewObj : Review;


  @Input()
  passedVari: Movie[];

  constructor(private route: ActivatedRoute, private movieService: MovieService
    , private fb:FormBuilder,private userService: UserService) { }

  ngOnInit() {
     //initailise form
     this.addReviewForm = this.fb.group({
      reviewTitle:['', Validators.required],
      reviewComment:['', Validators.required],
   })

    this.route.params.subscribe(({movieId}) => this.id = movieId);
    this.movie = this.movieService.getMovieBYID(this.id);
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

  

}
