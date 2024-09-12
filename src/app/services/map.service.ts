import { Injectable } from '@angular/core';
import { getDistance } from 'geolib'
import L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentLocation = { lat:8.556815,lon:76.8727534}
  private map!: L.Map;
  private markers: L.Marker[] = [];
  
  constructor() { }
  
  distanceFromCurrentLocation(lat: number, lon: number): number {
    // Check for valid coordinates
    if (isNaN(lat) || isNaN(lon)) {
      console.error('Invalid coordinates passed:', lat, lon);
      return Infinity; // Return a large distance if coordinates are invalid
    }

    const distance = getDistance(
      { latitude: this.currentLocation.lat, longitude: this.currentLocation.lon },
      { latitude: lat, longitude: lon }
    );

    return distance / 1000;
  }
 

  initMap(containerId: string, center: L.LatLngExpression, zoom: number): void {
    this.map = L.map(containerId).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  addMarker(latLng: L.LatLngExpression, iconUrl: string, description: string): void {
    const marker = L.marker(latLng, {
      icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      })
    }).addTo(this.map)
      .bindPopup(`<b>Incident:</b><br>${description}`)
      .openPopup();
    
    this.markers.push(marker);
  }

  clearMarkers(): void {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }

  setMapView(latLng: L.LatLngExpression, zoom: number): void {
    this.map.setView(latLng, zoom);
  }

  getMap(): L.Map {
    return this.map;
  }
}
