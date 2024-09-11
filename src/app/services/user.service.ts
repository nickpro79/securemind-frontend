import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,BehaviorSubject } from 'rxjs';
import { Login } from '../Models/login';
import { Register } from '../Models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:5018/api"
  isAuthenticated:boolean=false;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  Login(data:Login):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, data);
    
  }

  Register(data:Register):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`,data)
  }

  get isAuthenticated$(): Observable<boolean> {
    return of(this.isAuthenticated); 
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem("AuthenticationToken")
    this.isAuthenticated=false
    this.loggedIn.next(false);
  }




}
