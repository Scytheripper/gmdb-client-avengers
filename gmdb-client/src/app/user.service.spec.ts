import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

let injector: TestBed;
let httpMock: HttpTestingController;

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  beforeEach( () => {
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should get user with given username and password', () => {
    //Setup
    const service: UserService = TestBed.get(UserService);
    const user = {id: 1, username: 'guest', password: 'password', email: 'email@email.com'};
    service.users = [user];
    expect(service.login('guest', 'password')).toBe(true);
 
    const req = httpMock.expectOne(environment.API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('should set the currently logged in user', () => {
    //Setup 
    const service: UserService = TestBed.get(UserService);
    const user = {id: 1, username: 'guest',name:'name', password: 'password', email: 'email@email.com'};

    //Exercise
    service.setLoggedInUser(user);

    //Assert
    expect(service.loggedInUser).toEqual(user);
  });

  it('should modify the user', () => {
    const service: UserService = TestBed.get(UserService);
    const user = {id: 1, username: 'guest',name:'name', password: 'password', email: 'email@email.com'};

    service.updateUser(user);

    const req = httpMock.expectOne(environment.API_URL);
    expect(req.request.method).toBe('PUT');
  });

  it('should allow user to sign up', () => {
    const service: UserService = TestBed.get(UserService);
    const user = {id: 1,name:'name', username: 'guest', password: 'password', email: 'email@email.com'};

    service.signup(user);

    const req = httpMock.expectOne(environment.API_URL);
    expect(req.request.method).toBe('POST');    
  })

});
