import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn, AbstractControl } from '@angular/forms';
import L from 'leaflet';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  map!: L.Map;
  address: string = '';
  defaultCenter: L.LatLngExpression = [10.791828, 76.6516003];
  zoom = 5;
  showModal = false;
  incidentForm: FormGroup;
  incidentMarkers: L.Marker[] = []; // Store incident markers
  searchMarker?: L.Marker; // Store the search result marker

  constructor(private fb: FormBuilder) {
    this.incidentForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      Location: ['']
    },{
      validators:[this.latitudeValidator(),this.longitudeValidator()]
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
          const animatedIcon = L.divIcon({
            className: 'pulse-icon',  // Apply the CSS class with animation
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ff0000"/></svg>',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });
          // Add markers for each incident
          data.$values.forEach((incident: any) => {
            const latLng: L.LatLngExpression = [incident.location.latitude, incident.location.longitude];
            
            const marker = L.marker(latLng, { icon: L.icon({
              iconUrl: 'assets/circle-icon.svg', // Path to your red icon
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              className: 'pulse-icon'
            }) })
              .addTo(this.map)
              .bindPopup(`<b>Incident:</b><br>${incident.description}`)
              .openPopup();
              
            this.incidentMarkers.push(marker); // Store the marker
          });
        } else {
          console.error('Expected an array of incidents but got:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching incidents:', error);
      });

      fetch('http://localhost:5240/api/report')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched reports:', data); // Log the response to check its structure

        // Check if data has the $values property and it is an array
        if (data && Array.isArray(data.$values)) {
          const animatedIcon = L.divIcon({
            className: 'pulse-icon',  // Apply the CSS class with animation
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ff0000"/></svg>',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });
          // Add markers for each incident
          data.$values.forEach((incident: any) => {
            const latLng: L.LatLngExpression = [incident.location.latitude, incident.location.longitude];
            
            const marker = L.marker(latLng, { icon: L.icon({
              iconUrl: 'assets/circle-icon.svg', // Path to your red icon
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              className: 'pulse-icon'
            }) })
              .addTo(this.map)
              .bindPopup(`<b>Incident:</b><br>${incident.description}`)
              .openPopup();
              
            this.incidentMarkers.push(marker); // Store the marker
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

          // Remove the previous search marker if it exists
          if (this.searchMarker) {
            this.map.removeLayer(this.searchMarker);
          }

          this.searchMarker = L.marker(latLng)
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
      const formData = {
        latitude: this.incidentForm.value.latitude,
        longitude: this.incidentForm.value.longitude,
        type: this.incidentForm.value.type,
        description: this.incidentForm.value.description,
        Location: {
          Latitude: this.incidentForm.value.latitude,
          Longitude: this.incidentForm.value.longitude
        },
        ReportTime: new Date().toISOString() // Or any other relevant date/time
      };
      
  
      fetch('http://localhost:5240/api/Report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(async (response) => {
        const result = await response.json();
        console.log('Server response:', response.status, result);
  
        if (!response.ok) {
          // Log specific validation errors if available
          console.error('Validation errors:', result.errors);
          if (result.errors && result.errors['Location']) {
            console.error('Location validation error:', result.errors['Location']);
          }
          if (result.errors && result.errors['report']) {
            console.error('Report validation error:', result.errors['report']);
          }
          throw new Error(result.title || 'Failed to submit the incident report.');
        }
  
        alert('Report submitted successfully!');
        this.incidentForm.reset();
        this.closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error submitting report:', error);
        alert('There was an error submitting your report. Please try again.');
      });
    } else {
      console.log('Form is invalid');
      this.incidentForm.markAllAsTouched();
    }


  }
  
  
  
  validateControl(input:string){
    return this.incidentForm.get(input)?.invalid &&
    (this.incidentForm.get(input)?.touched || this.incidentForm.get(input)?.dirty)
    }

  validateControlError(input:string,errorType:string){
      return this.incidentForm.get(input)?.hasError(errorType) &&
      (this.incidentForm.get(input)?.touched || this.incidentForm.get(input)?.dirty)
    }

    longitudeValidator(): ValidatorFn {
      return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
        const longitude = parseFloat(formGroup.get('longitude')?.value);
        const error: { [key: string]: boolean } = {};
        if (isNaN(longitude)) {
          error['notANumber'] = true;
        }  
        if (longitude < -180 || longitude > 180) {
          error['valueOutOfRange'] = true;
        } 
        if (Object.keys(error).length > 0) {
          formGroup.get('longitude')?.setErrors(error);
          return error;
        } else {
          formGroup.get('longitude')?.setErrors(null);
          return null;
        }
      };
      }


latitudeValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const latitude = parseFloat(formGroup.get('latitude')?.value);
        const error: { [key: string]: boolean } = {};
        if (isNaN(latitude)) {
          error['notANumber'] = true;
        }
        if (latitude < -90 || latitude > 90) {
          error['valueOutOfRange'] = true;
        } 
        if (Object.keys(error).length > 0) {
          formGroup.get('latitude')?.setErrors(error);
          return error;
        } else {
          formGroup.get('latitude')?.setErrors(null);
          return null;
        }
}
}
}
