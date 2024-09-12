import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-counselor-profile-popup',
  templateUrl: './counselor-profile-popup.component.html',
  styleUrl: './counselor-profile-popup.component.css'
})
export class CounselorProfilePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public counselor: any,
    private dialogRef: MatDialogRef<CounselorProfilePopupComponent>
  ) {}  closePopup(): void {
    this.dialogRef.close(); // Closes the dialog
  }
}
