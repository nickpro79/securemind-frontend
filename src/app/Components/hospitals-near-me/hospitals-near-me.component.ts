import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-hospitals-near-me',
  templateUrl: './hospitals-near-me.component.html',
  styleUrl: './hospitals-near-me.component.css'
})
export class HospitalsNearMeComponent {
  address: string = '';
  hospitals: any[] = [];
  errorMessage: string = '';

  constructor(
    private hospitalService: HospitalService
  ) {}

  searchLocation() {
    if (!this.address.trim()) return;

    this.hospitalService.getCoordinates(this.address).pipe(
      map(response => {
        if (response.length > 0) {
          const { lat, lon } = response[0];
          return this.hospitalService.getHospitals(lat, lon);
        } else {
          throw new Error('No coordinates found.');
        }
      }),
      switchMap(hospitals => hospitals), // Flatten the observable
      catchError(error => {
        this.errorMessage = 'Error fetching hospitals.';
        return of([]);
      })
    ).subscribe(
      (hospitals: any[]) => {
        this.hospitals = hospitals;
        if (this.hospitals.length === 0) {
          this.errorMessage = 'No hospitals found.';
        }
      },
      (error) => {
        this.errorMessage = 'Error occurred.';
      }
    );
  }
}