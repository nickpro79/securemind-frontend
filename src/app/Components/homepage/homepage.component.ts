import { Component } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'] // Fix typo from `styleUrl` to `styleUrls`
})
export class HomepageComponent {
  map!: L.Map; // Define the map variable
  address: string = ''; // Address to search for, initialized as an empty string

  // Default map center coordinates
  defaultCenter: L.LatLngExpression = [10.791828, 76.6516003];
  zoom = 10; // Default zoom level

  ngOnInit(): void {
    this.initMap(); // Initialize the map on component load
  }

  // Initialize the map
  private initMap(): void {
    // Create the map and set its initial view
    this.map = L.map('map').setView(this.defaultCenter, this.zoom);

    // Add OpenStreetMap tiles as the map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  // Function to search and center the map to the input location
  searchLocation(searchTerm: string): void {
    if (!searchTerm.trim()) return; // Do nothing if the search term is empty

    // Use the Nominatim service for geocoding with OpenStreetMap data
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => {
        if (data && data.length > 0) {
          const location = data[0]; // Get the first search result
          const latLng: L.LatLngExpression = [parseFloat(location.lat), parseFloat(location.lon)]; // Convert to LatLng

          // Center the map to the found location
          this.map.setView(latLng, this.zoom);

          const customIcon = L.icon({
            iconUrl: '../assets/icon.svg', // Path to your custom icon image
            iconSize: [32, 32], // Size of the icon (adjust as needed)
            iconAnchor: [16, 32], // Anchor point of the icon (bottom center)
            popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
          });
          

          // Clear previous markers (optional)
          this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              this.map.removeLayer(layer);
            }
          });

          // Add a marker to the found location with the custom icon
          L.marker(latLng, { icon: customIcon })
            .addTo(this.map)
            .bindPopup(searchTerm) // Bind a popup with the address
            .openPopup(); // Open the popup automatically
        } else {
          alert('Location not found!'); // Alert if no location is found
        }
      })
      .catch((error) => {
        console.error('Error fetching location:', error); // Log any errors
      });
  }
}
