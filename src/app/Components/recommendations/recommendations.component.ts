import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CounsellorService } from '../../services/counsellor.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent {
  specialization: string = '';
  counselors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private counsellorService: CounsellorService,
    private mapService:MapService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.specialization = params['specialization'];
      this.getCounselors();
    });
  }

  getCounselors() {
    this.counsellorService.getCounselorsBySpecialization(this.specialization)
      .subscribe(data => {
        console.log('Counselors data:', data);  // Check the data structure
        this.counselors = data.filter((counselor: any) => {
          console.log('Counselor coordinates:', counselor.latitude, counselor.longitude);  // Log coordinates
          if (counselor.latitude && counselor.longitude) {
            const distance = this.mapService.distanceFromCurrentLocation(
              counselor.latitude,
              counselor.longitude
            );
            return distance < 50; // Show only counselors within 50 km
          } else {
            console.warn('Missing coordinates for counselor:', counselor);
            return false;
          }
        });
      });
  }
}
