import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SecureMind-Frontend';
  isNearbyServicesOpen = false;
  isResourcesOpen = false;

  toggleDropdown(dropdown: string) {
    if (dropdown === 'nearbyServices') {
      this.isNearbyServicesOpen = !this.isNearbyServicesOpen;
      this.isResourcesOpen = false; // Close the other dropdown
    } else if (dropdown === 'resources') {
      this.isResourcesOpen = !this.isResourcesOpen;
      this.isNearbyServicesOpen = false; // Close the other dropdown
    }
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
