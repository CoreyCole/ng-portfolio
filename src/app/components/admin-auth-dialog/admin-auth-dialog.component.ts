import { Component, OnInit, Inject } from '@angular/core';

// angular material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin-auth-dialog',
  template: `
    <h2 mat-dialog-title>Admin Sign Up</h2>
    <div>
    <mat-form-field>
      <input matInput [(ngModel)]="data.email" type="email" placeholder="email">
    </mat-form-field>
    <mat-form-field>
      <input matInput [(ngModel)]="data.password" type="password" placeholder="password">
    </mat-form-field>
    </div>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" (click)="save(data)" [disabled]="!data.email || !data.password">Save</button>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
    </mat-dialog-actions>
  `,
})
export class AdminAuthDialogComponent {

  public email: string;
  public password: string;

  constructor(public dialogRef: MatDialogRef<AdminAuthDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public save(data: { email: string; password: string }) {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
