import { Component } from '@angular/core';

@Component({
  selector: 'app-policestations-near-me',
  templateUrl: './policestations-near-me.component.html',
  styleUrl: './policestations-near-me.component.css'
})
export class PolicestationsNearMeComponent {
  address: string = '';

  searchLocation() {
    if (!this.address.trim()) return;
    console.log('Searching for:', this.address);
  }
}
