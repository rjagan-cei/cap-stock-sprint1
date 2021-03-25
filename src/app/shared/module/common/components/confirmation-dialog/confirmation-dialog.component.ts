import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog {

  confirmationMessage: String;
  proceedBtnText: String;
  backBtnText: String;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.confirmationMessage = data.message;
    this.proceedBtnText = data.proceedBtn;
    this.backBtnText = data.backBtn;
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {

  constructor(public message: String, public proceedBtn?: String, public backBtn?: String) {
  }

}
