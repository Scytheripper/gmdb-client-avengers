import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ReviewService } from './review.service';
import { Review } from './review';

describe('ReviewService', () => {

  let reviewService : ReviewService;
  let reviewURL = 'http://localhost:4200/assets/reviews.json';

  let reviewMockData =
  [
    {
      "MovieId":"12345",
      "UserId"  :"abcMovie",
      "ReviewTitle":"Worth Watch",
      "ReviewComment":"Good Movie"
    }
  ]

  let injector : TestBed;
  let httpMock: HttpTestingController;


  beforeEach(() => TestBed.configureTestingModule({
    providers: [ReviewService],
    imports: [
      HttpClientTestingModule,
    ],

  }));

  afterEach(()=>{
    httpMock.verify();
  })

  beforeEach(() => {
    injector = getTestBed();
    reviewService = injector.get(ReviewService);
    httpMock = injector.get(HttpTestingController);
  })

  it('should be created', () => {
    const service: ReviewService = TestBed.get(ReviewService);
    expect(service).toBeTruthy();
  });
  
  it('should have addReviews for movie Method', () => {
    expect(reviewService.addReviews).toBeTruthy;
  })

  it('should have get reviews for movie Method', () => {
    expect(reviewService.getReviews).toBeTruthy;
  })

  it('should allow users to add reviews for movies', () => {
    const service: ReviewService = TestBed.get(ReviewService);
    const reviewObj = new Review;
     reviewObj.MovieId="abc";
     reviewObj.Email="ab@vd.com";
     reviewObj.ReviewTitle="Good Movie";
     reviewObj.ReviewComment="worth watch 3.5/5 rating";

    service.addReviews(reviewObj);
    const req = httpMock.expectOne(reviewURL);
    expect(req.request.method).toBe('PUT');    
  })

  it('should make http calls and  fetch reviews for a movie', () => {
    const movieId ="abcMovie" ;
    reviewService.getReviews(movieId).subscribe(reviews => {
      expect(reviews instanceof Review).toBeTruthy;
    });
    
    const req = httpMock.expectOne(reviewURL);
    expect(req.request.method).toBe('GET');
    req.flush(reviewMockData);
  })
});
