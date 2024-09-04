import { Component, OnInit } from '@angular/core';
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
  constructor(private _userservice:UserService){

  }
  ngOnInit(): void {

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
}
