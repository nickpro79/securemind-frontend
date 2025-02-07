import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Models/login';
import { Register } from '../Models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:5018/api"
  constructor(private http: HttpClient) { }

  Login(data:Login):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  Register(data:Register):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`,data)
  }
}
