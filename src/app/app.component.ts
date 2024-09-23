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
  isNearbyServicesOpen = false;
  isResourcesOpen = false;


  toggleDropdown(dropdown: string) {
    if (dropdown === 'nearbyServices') {
      this.isNearbyServicesOpen = !this.isNearbyServicesOpen;
      this.isResourcesOpen = false; 
    } else if (dropdown === 'resources') {
      this.isResourcesOpen = !this.isResourcesOpen;
      this.isNearbyServicesOpen = false;
    }
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  onLogout() {
    this._userService.logout();
    this.router.navigate(['/home']);
    
  }


}
