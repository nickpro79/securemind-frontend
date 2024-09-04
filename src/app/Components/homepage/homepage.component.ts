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
  zoom = 13; // Default zoom level

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
  searchLocation() {
    if (!this.address.trim()) return; // Do nothing if the address is empty

    // Use the Nominatim service for geocoding with OpenStreetMap data
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        this.address
      )}`
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => {
        if (data && data.length > 0) {
          const location = data[0]; // Get the first search result
          const latLng: L.LatLngExpression = [location.lat, location.lon]; // Convert to LatLng

          // Center the map to the found location
          this.map.setView(latLng, this.zoom);

          // Define a custom icon
          const customIcon = L.icon({
            iconUrl: 'src\assets\custom-marker-icon.png', // Path to your custom icon image
            iconSize: [25, 41], // Size of the icon (adjust as needed)
            iconAnchor: [12, 41], // Anchor point of the icon (bottom center)
            popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
          });

          // Add a marker to the found location with the custom icon
          L.marker(latLng, { icon: customIcon })
            .addTo(this.map)
            .bindPopup(this.address) // Bind a popup with the address
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
