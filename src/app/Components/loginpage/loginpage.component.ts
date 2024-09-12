import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Login } from '../../Models/login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent implements OnInit {
  data: Login = {
    username: "",
    password: ""
  };
  loginForm: FormGroup = null!;
  isLoading = false; 
  
  constructor(private _userservice: UserService, private Fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.Fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validateControl(input: string) {
    return this.loginForm.get(input)?.invalid &&
      (this.loginForm.get(input)?.touched || this.loginForm.get(input)?.dirty);
  }

  validateControlError(input: string, errorType: string) {
    return this.loginForm.get(input)?.hasError(errorType) &&
      (this.loginForm.get(input)?.touched || this.loginForm.get(input)?.dirty);
  }

  Login(username: HTMLInputElement, password: HTMLInputElement) {
    this.data.username = username.value;
    this.data.password = password.value;
    this.isLoading = true;

    this._userservice.Login(this.data)
    .subscribe({
      next: (response) => {
        setTimeout(() => { 
          localStorage.setItem("AuthenticationToken", response.token);
          this._userservice.isAuthenticated = true;
          this.router.navigate(['/home']);
          this.isLoading = false; 
        }, 2000); 
      },
      error: (err) => {
        setTimeout(() => { 
          console.log(err);
          this.isLoading = false; 
        }, 2000); 
      }
    });
  }

  get validForm() {
    return this.loginForm.valid;
  }
}
