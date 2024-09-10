import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CounsellorService } from '../../services/counsellor.service';

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
    private counsellorService: CounsellorService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.specialization = params['specialization'];
      this.getCounselors();
    });
  }

  getCounselors() {
    this.counsellorService.getCounselorsBySpecialization(this.specialization).subscribe(data => {
      this.counselors = data;
    });
  }
}
