import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

class MockUserService{
    login()
    {
      return true;
    }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule,FormsModule],
      providers:[ {provide: UserService, useClass: MockUserService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form on submit',()=>{
    component.loginForm.controls.userName.setValue('abc@abc');
    component.loginForm.controls.password.setValue('password');

    expect(component.loginForm.valid).toBeTruthy();
  })
});
