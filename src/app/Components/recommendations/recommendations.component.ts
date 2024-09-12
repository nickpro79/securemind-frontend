import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CounsellorService } from '../../services/counsellor.service';
import { MapService } from '../../services/map.service';
import { CounselorProfilePopupComponent } from '../counselor-profile-popup/counselor-profile-popup.component';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent {
  specialization: string = '';
  counselors: any[] = [];
  isLoading = true; // Start with loading spinner visible
  private readonly loadingDelay = 1000; // Delay in milliseconds

  constructor(
    private route: ActivatedRoute,
    private counsellorService: CounsellorService,
    private mapService: MapService,
    private dialog: MatDialog
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
        this.counselors = data.filter((counselor: any) => {
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

        setTimeout(() => {
          this.isLoading = false;
        }, this.loadingDelay);
      });
  }

  openCounselorProfile(counselor: any) {
    this.dialog.open(CounselorProfilePopupComponent, {
      data: counselor,
    });
  }
}
