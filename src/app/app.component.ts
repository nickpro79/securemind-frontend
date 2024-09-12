import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SecureMind-Frontend';
  isDropdownOpen = false;
  loginText!:string

  constructor(private _userService:UserService,private router:Router){ }

  ngOnInit(): void {
    this._userService.isLoggedIn.subscribe(isLoggedIn => {
      this.loginText = isLoggedIn ? 'Logout' : 'Login';
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout() {
    this._userService.logout();
    this.router.navigate(['/home']);
    
  }


}
