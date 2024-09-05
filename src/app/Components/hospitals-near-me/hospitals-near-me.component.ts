import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospitals-near-me',
  templateUrl: './hospitals-near-me.component.html',
  styleUrl: './hospitals-near-me.component.css'
})
export class HospitalsNearMeComponent {
  address: string = '';

  searchLocation() {
    if (!this.address.trim()) return;
    console.log('Searching for:', this.address);
  }
}
