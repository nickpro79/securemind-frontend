import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MapService } from '../../services/map.service';
import L from 'leaflet';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  address: string = '';
  defaultCenter: L.LatLngExpression = [10.791828, 76.6516003];
  zoom = 5;
  showModal = false;
  incidentForm: FormGroup;
  searchMarker?: L.Marker; 

  constructor(private fb: FormBuilder, private mapService: MapService) {
    this.incidentForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      Location: ['']
    },{
      validators:[this.latitudeValidator(), this.longitudeValidator()]
    });
  }

  ngOnInit(): void {
    this.mapService.initMap('map', this.defaultCenter, this.zoom);
    this.loadIncidents(); 
  }

  private loadIncidents(): void {
    this.fetchData('http://localhost:5240/api/CrimeIncidents');
    this.fetchData('http://localhost:5240/api/report');
  }

  private async fetchData(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(`Fetched data from ${url}:`, data);

      if (data && Array.isArray(data.$values)) {
        this.mapService.clearMarkers(); // Clear existing markers
        data.$values.forEach((incident: any) => {
          const latLng: L.LatLngExpression = [incident.location.latitude, incident.location.longitude];
          this.mapService.addMarker(latLng, 'assets/circle-icon.svg', incident.description);
        });
      } else {
        console.error('Expected an array but got:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  searchLocation(searchTerm: string): void {
    if (!searchTerm.trim()) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const location = data[0];
          const latLng: L.LatLngExpression = [parseFloat(location.lat), parseFloat(location.lon)];

          this.mapService.setMapView(latLng, this.zoom);

          if (this.searchMarker) {
            this.mapService.getMap().removeLayer(this.searchMarker);
          }

          this.searchMarker = L.marker(latLng)
            .addTo(this.mapService.getMap())
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
        ReportTime: new Date().toISOString()
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
          console.error('Validation errors:', result.errors);
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

  validateControl(input: string) {
    return this.incidentForm.get(input)?.invalid &&
      (this.incidentForm.get(input)?.touched || this.incidentForm.get(input)?.dirty);
  }

  validateControlError(input: string, errorType: string) {
    return this.incidentForm.get(input)?.hasError(errorType) &&
      (this.incidentForm.get(input)?.touched || this.incidentForm.get(input)?.dirty);
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
    };
  }
}
