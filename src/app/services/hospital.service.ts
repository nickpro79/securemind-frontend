// src/app/services/hospital.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Hospital, OverpassResponse } from '../Models/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';
  private overpassUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${encodeURIComponent(address)}&format=json`);
  }

  getHospitals(latitude: number, longitude: number): Observable<Hospital[]> {
    const query = `[out:json];node["amenity"="hospital"](around:5000,${latitude},${longitude});out;`;
    return this.http.get<OverpassResponse>(`${this.overpassUrl}?data=${encodeURIComponent(query)}`).pipe(
      map(response => response.elements.map(element => ({
        name: element.tags?.name || 'Unknown Hospital',
        address: element.tags?.['addr:full'] || 'Not available',
        phone: element.tags?.phone || 'Not available',
        latitude: element.lat,
        longitude: element.lon
      }))),
      catchError(error => {
        console.error('Error fetching hospital data:', error);
        return of([]);
      })
    );
  }
}
