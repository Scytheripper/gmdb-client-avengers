import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailComponent } from './account-detail.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { RouterTestingModule } from '@angular/router/testing';


class MockUserService {
  loggedInUser =  {
    id: 1,
    username: "guest",
    name: "name",
    password: "password",
    email: "email@email.com" 
  }

  updateUser(user: User) {

  }
  getLoggedInUser(){
    return this.loggedInUser;
  }
}

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ,MovieListComponent],
      providers: [
        {provide: UserService, useClass: MockUserService }
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the logged in user from the service', () =>  {
    const user = {
      id: 1,
      name: "name",
      username: "guest",
      password: "password",
      email: "email@email.com" 
    };

    expect(component.user).toEqual(user);
  });

  it('should display the users details', () => {
    expect(fixture.nativeElement.querySelector('#username').textContent).toEqual('guest');
    expect(fixture.nativeElement.querySelector('#email').textContent).toEqual('email@email.com');
  });

  it('should contain a form group with for the new password and confirmation', () => {
    expect(component.passwordForm.controls.newPassword).toBeTruthy();
    expect(component.passwordForm.controls.confirmPassword).toBeTruthy();
  });

  it('should make sure the passwords are the same before submit', () => {
    component.passwordForm.controls.newPassword.setValue('password');
    component.passwordForm.controls.confirmPassword.setValue('password');

    expect(component.changePassword()).toEqual(true);
  });
});
