import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { reviews } from '../assets/reviews.json';
import { Review } from './review.js';
import { User } from './user.js';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment.js';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
   
  reviewData: Review[];
  reviewForm : FormGroup;

  revieList = reviews;
  private reviewURL = 'http://localhost:4200/assets/reviews.json';
  
  //all reviews to store in local storage
  reviews = JSON.parse(localStorage.getItem('reviews'));
  loggedInUser: User;



  constructor(private httpclient: HttpClient) { }
  
  getAllReviews():Observable<Review[]>{
    return this.httpclient.get<Review[]>('http://localhost:4200/assets/reviews.json');

  }
  
  getReviews(movieId:string):Observable<Review[]>{
    this.getAllReviews().
    subscribe(review => {
      this.reviewData = review.
      filter(data => data.MovieId==movieId);
    });
    return of(this.reviewData);
  }

  addReviews(reviewObj:Review){
    reviewObj.MovieId = "123";
    reviewObj.Email="ab@cd.com";
    reviewObj.ReviewTitle="test title";
    reviewObj.ReviewComment="test comments";
    localStorage.setItem('reviews',JSON.stringify(reviewObj));
    this.httpclient.put(this.reviewURL,reviewObj).subscribe();

  }

  //Use new api methods
  submitReview(review): Observable<any> {
    return this.httpclient.post(`${environment.review_api_url}`, review);
  }

  getReviewsForMovie(movieId):Observable<any[]>  {
    return this.httpclient.get<any[]>(`${environment.review_api_url}?movieId=${movieId}`);
  }

}
