import { Component } from '@angular/core';
import { TherapyExpectations, TherapyReasons } from '../../Models/therapy-scores';
import { CounsellorService } from '../../services/counsellor.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent {
  expectationsScore: number = 0;
  reasonsScore: number = 0;
  totalScore: number = 0;
  specialization: string = '';
  counsellors: any[] = [];
  error: string = '';

  constructor(private counsellorService: CounsellorService) {}

  onExpectationsChange(selectedAnswer: string) {
    this.expectationsScore = TherapyExpectations[selectedAnswer as keyof typeof TherapyExpectations];
    this.calculateTotalScore();
  }

  onReasonsChange(selectedAnswer: string) {
    this.reasonsScore = TherapyReasons[selectedAnswer as keyof typeof TherapyReasons];
    this.calculateTotalScore();
  }

  calculateTotalScore() {
    this.totalScore = this.expectationsScore + this.reasonsScore;
  }

  determineSpecialization() {
    if (this.totalScore <= 50) {
      this.specialization = 'Mental Health Counselor';
    } else if (this.totalScore <= 100) {
      this.specialization = 'Clinical Psychologist';
    } else {
      this.specialization = 'Marriage Counselor';
    }
    this.getCounsellors(this.specialization);
  }

  getCounsellors(specialization: string): void {
    this.counsellorService.getCounsellors(specialization)
      .subscribe(
        data => {
          this.counsellors = data;
          console.log(this.counsellors)
        },
        error => {
          this.error = 'Error fetching counsellors';
          console.error('Error fetching counsellors:', error);
        }
      );
  }
}
