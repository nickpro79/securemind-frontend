import { Component, OnInit } from '@angular/core';
import L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  map!: L.Map;
  address: string = '';
  defaultCenter: L.LatLngExpression = [10.791828, 76.6516003];
  zoom = 5;
  showModal = false;
  incidentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.incidentForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initMap();
    this.loadIncidents(); // Load incidents when component initializes
  }

  private initMap(): void {
    this.map = L.map('map').setView(this.defaultCenter, this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private loadIncidents(): void {
    fetch('http://localhost:5240/api/CrimeIncidents')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched incidents:', data); // Log the response to check its structure
  
        // Check if data has the $values property and it is an array
        if (data && Array.isArray(data.$values)) {
          // Clear existing markers
          this.map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              this.map.removeLayer(layer);
            }
          });
  
          // Add markers for each incident
          data.$values.forEach((incident: any) => {
            const latLng: L.LatLngExpression = [incident.location.latitude, incident.location.longitude];
            
            L.marker(latLng, { icon: L.icon({
              iconUrl: 'assets/circle-icon.svg', // Path to your red icon
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }) })
              .addTo(this.map)
              .bindPopup(`<b>Incident:</b><br>${incident.description}`)
              .openPopup();
          });
        } else {
          console.error('Expected an array of incidents but got:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching incidents:', error);
      });
  }
  
  
  searchLocation(searchTerm: string): void {
    if (!searchTerm.trim()) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const location = data[0];
          const latLng: L.LatLngExpression = [parseFloat(location.lat), parseFloat(location.lon)];

          this.map.setView(latLng, this.zoom);

          this.map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              this.map.removeLayer(layer);
            }
          });

          L.marker(latLng)
            .addTo(this.map)
            .bindPopup(searchTerm)
            .openPopup();
        } else {
          alert('Location not found!');
        }
      })
      .catch(error => console.error('Error fetching location:', error));
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onModalClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  submitForm(): void {
    if (this.incidentForm.valid) {
      console.log('Incident submitted:', this.incidentForm.value);
      this.incidentForm.reset();
      this.closeModal();
    } else {
      console.log('Form is invalid');
    }
  }
}
