import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {
  private apiUrl = ' http://localhost:5240/api/Counsellors/Specialization';
  constructor(private http: HttpClient) { }

  getCounsellors(specialization: string): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(`${this.apiUrl}?specialization=${encodeURIComponent(specialization)}`, { headers });
  }
}
