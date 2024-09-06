import { Component } from '@angular/core';
import { Register } from '../../Models/register';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent {
  data:Register={
    username:"",
    email:"",
    password:""
      }
  constructor(private _userservice:UserService){}
RegisterButton(username:string,email:string,password:string,confirmedpassword:string)
{
  if(password!==confirmedpassword){
    alert("Passwords do not match")
  }
  this.data.username = username,
  this.data.email = email,
  this.data.password=password

 this._userservice.Register(this.data)
 .subscribe({
  next:(response)=>{console.log(response)},
  error:(error)=>{console.log(error)}
 })


}
}
