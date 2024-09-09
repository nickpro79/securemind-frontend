import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => !!isAuthenticated),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']); 
        }
      })
    );
  }
}