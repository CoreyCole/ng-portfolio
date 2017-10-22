import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
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
      <button mat-raised-button color="primary" (click)="openAdminSingUpDialog()">
        Login
      </button>
    </mat-toolbar>
    <mat-toolbar color="primary"></mat-toolbar>
    <h3>Basic Buttons</h3>
    <div>
      <button mat-button>Basic</button>
      <button mat-button color="primary">Primary</button>
      <button mat-button color="accent">Accent</button>
      <button mat-button color="warn">Warn</button>
      <button mat-button disabled>Disabled</button>
      <a mat-button routerLink=".">Link</a>
    </div>

    <h3>Raised Buttons</h3>
    <div>
      <button mat-raised-button>Basic</button>
      <button mat-raised-button color="primary">Primary</button>
      <button mat-raised-button color="accent">Accent</button>
      <button mat-raised-button color="warn">Warn</button>
      <button mat-raised-button disabled>Disabled</button>
      <a mat-raised-button routerLink=".">Link</a>
    </div>
    <ul *ngFor="let itemDoc of items | async">
      <li *ngFor="let itemIndex of keys(itemDoc)">
        {{itemIndex}} : {{itemDoc[itemIndex]}}
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public email: string;
  public password: string;
  public error: string;
  public adminExists = true;

  // for testing
  public items: Observable<any[]>;

  constructor(private db: AngularFirestore,
              private auth: AuthService,
              private dialog: MatDialog) {
    this.items = db.collection('items').valueChanges();
    this.auth.adminUserExists().subscribe(adminExists => this.adminExists = adminExists);
  }

  public openAdminSingUpDialog() {
    const dialogRef = this.dialog.open(AdminAuthDialogComponent, {
      width: '250px',
      data: { email: this.email, password: this.password }
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

  public keys(object: object) {
    return Object.keys(object);
  }
}
