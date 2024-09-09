import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn, AbstractControl } from '@angular/forms';
import L from 'leaflet';


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
    },{
      validators:[this.latitudeValidator(),this.longitudeValidator()]
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
