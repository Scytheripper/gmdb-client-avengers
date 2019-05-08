import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

class MockUserService {
  signup() {
    return true;
  }
  signupAuth() { return new Observable();}
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
    
      ],
      providers: [
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if signup validates submited input ', () => {
    component.signupForm.controls.name.setValue('name');
    component.signupForm.controls.username.setValue('Username');
    component.signupForm.controls.email.setValue('Test@email.com');
    component.signupForm.controls.password.setValue('password');
    component.signupForm.controls.confirmPassword.setValue('password');
    console.log(component.signupUser());
    expect(component.signupUser()).toBeTruthy();
  });
});
