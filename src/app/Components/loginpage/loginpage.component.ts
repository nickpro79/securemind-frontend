import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../Models/login';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent implements OnInit {
data:Login={
username:"",
password:""
}
loginForm:FormGroup=null!

constructor(private _userservice:UserService, private Fb:FormBuilder){}

ngOnInit(): void {
  this.loginForm = this.Fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  }

  validateControl(input:string){
    return this.loginForm.get(input)?.invalid &&
    (this.loginForm.get(input)?.touched || this.loginForm.get(input)?.dirty)
    }

  validateControlError(input:string,errorType:string){
      return this.loginForm.get(input)?.hasError(errorType) &&
      (this.loginForm.get(input)?.touched || this.loginForm.get(input)?.dirty)
    }

  Login(username:HTMLInputElement,password:HTMLInputElement){
    this.data.username = username.value
    this.data.password = password.value
    this._userservice.Login(this.data)
    .subscribe({
     next:(response)=>{console.log(response)},
     error:(err)=>{console.log(err)}
    })
  }

  get validForm(){
    return this.loginForm.valid
  }
}
