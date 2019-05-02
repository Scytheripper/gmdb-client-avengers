import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

class MockUserService {
  signup() {
    return true;
  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
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
    component.signupForm.controls.username.setValue('Username');
    component.signupForm.controls.email.setValue('Test@email.com');
    component.signupForm.controls.password.setValue('password');
    component.signupForm.controls.confirmPassword.setValue('password');

    expect(component.signupUser()).toEqual(true);
  });
});
