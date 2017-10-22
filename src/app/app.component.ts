import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

// angular material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// components
import { AdminAuthDialogComponent } from './components/admin-auth-dialog/admin-auth-dialog.component';

// services
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="warn" *ngIf="error">
      {{ error }}
    </mat-toolbar>
    <mat-toolbar color="warn" *ngIf="!adminExists">
      <span>No admin registered</span>
      <span class="spacer"></span>
      <button mat-raised-button color="primary" (click)="openAdminSignUpDialog()">
        Login
      </button>
    </mat-toolbar>
    <app-scroll-toolbar title="Corey Cole"></app-scroll-toolbar>
    <router-outlet></router-outlet>
    <mat-toolbar color="warn" *ngIf="adminExists" class="footer">
      <span class="spacer"></span>
      <span *ngIf="adminIsLoggedIn">
        <button mat-raised-button color="primary" routerLink="/edit/new">Create Project</button>
      </span>
      <span *ngIf="!adminIsLoggedIn" >
        <i class="fa fa-lock" aria-hidden="true" (click)="openAdminSignInDialog()"></i>
      </span>
      <span *ngIf="adminIsLoggedIn">
        <i class="fa fa-unlock-alt" aria-hidden="true" (click)="auth.signOut()"></i>
      </span>
    </mat-toolbar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public email: string;
  public password: string;
  public error: string;
  public adminExists = true;
  public adminIsLoggedIn = false;

  // for testing
  public items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              private auth: AuthService,
              private dialog: MatDialog) {
    this.items = db.collection('items').valueChanges();
    this.auth.adminUserExists().subscribe(adminExists => this.adminExists = adminExists);
    this.auth.adminLoggedIn().subscribe(adminIsLoggedIn => this.adminIsLoggedIn = adminIsLoggedIn);
  }

  public openAdminSignUpDialog() {
    const dialogRef = this.dialog.open(AdminAuthDialogComponent, {
      width: '250px',
      data: { title: 'Admin Sign Up', email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.auth.adminSignUp(data.email, data.password)
        .then(user => {
          console.log(user);
          this.auth.saveAdminUid(user.uid);
          this.error = null;
        })
        .catch(err => {
          this.error = err;
          console.error(err);
        });
    });
  }

  public openAdminSignInDialog() {
    const dialogRef = this.dialog.open(AdminAuthDialogComponent, {
      width: '250px',
      data: { title: 'Admin Sign In', email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.auth.adminSignIn(data.email, data.password)
        .catch(err => {
          this.error = err;
          console.error(err);
        });
    });
  }

  public keys(object: object) {
    return Object.keys(object);
  }
}
