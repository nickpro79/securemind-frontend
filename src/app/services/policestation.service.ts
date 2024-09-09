import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicestationService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';
  private overpassUrl = 'https://overpass-api.de/api/interpreter';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${encodeURIComponent(address)}&format=json`);
  }

  getPoliceStations(latitude: number, longitude: number): Observable<any[]> {
    const query = `[out:json];node["amenity"="police"](around:5000,${latitude},${longitude});out;`;
    return this.http.get<any>(`${this.overpassUrl}?data=${encodeURIComponent(query)}`).pipe(
      map(response => response.elements.map((element: { tags: { name: any; addr: { full: any; }; }; lat: any; lon: any; }) => ({
        name: element.tags?.name || 'Unknown Police Station',
        address: element.tags?.addr?.full || 'Not available',
        latitude: element.lat,
        longitude: element.lon
      }))),
      catchError(error => {
        console.error('Error fetching police station data', error);
        return of([]);
      })
    );
  }
}
