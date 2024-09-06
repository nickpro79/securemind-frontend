import { Component } from '@angular/core';
import L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  map!: L.Map;
  address: string = '';
  defaultCenter: L.LatLngExpression = [10.791828, 76.6516003];
  zoom = 10;
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
  }

  private initMap(): void {
    this.map = L.map('map').setView(this.defaultCenter, this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  searchLocation(searchTerm: string): void {
    if (!searchTerm.trim()) return;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`
    )
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const location = data[0];
          const latLng: L.LatLngExpression = [parseFloat(location.lat), parseFloat(location.lon)];

          this.map.setView(latLng, this.zoom);

          const customIcon = L.icon({
            iconUrl: '../assets/icon.svg',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          this.map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              this.map.removeLayer(layer);
            }
          });

          L.marker(latLng, { icon: customIcon })
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
