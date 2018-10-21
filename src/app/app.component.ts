import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// angular material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// components
import { AdminAuthDialogComponent } from './components/admin-auth-dialog/admin-auth-dialog.component';

// services
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="app-root">
      <app-scroll-toolbar title="Corey Cole"></app-scroll-toolbar>
      <router-outlet></router-outlet>
      <footer class="footer">
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
        <mat-toolbar color="warn" *ngIf="adminExists">
          <a href="https://github.com/coreycole/ng-portfolio" class="source-link">
            <span><i class="fa fa-github"></i>ng-portfolio</span>
          </a>
          <span class="github-btn">
            <a class="github-button" href="https://github.com/coreycole/ng-portfolio"
                data-icon="octicon-star" data-show-count="true" aria-label="Star coreycole/ng-portfolio on GitHub">
              Star
            </a>
          </span>
          <span class="github-btn">
            <a class="github-button" href="https://github.com/coreycole/ng-portfolio/fork"
                data-icon="octicon-repo-forked" data-show-count="true" aria-label="Fork coreycole/ng-portfolio on GitHub">
              Fork
            </a>
          </span>
          <span class="spacer"></span>
          <span *ngIf="adminIsLoggedIn && onHomePage">
            <button mat-raised-button color="primary" routerLink="/edit/new">Create Project</button>
          </span>
          <span *ngIf="!adminIsLoggedIn" >
            <i class="fa fa-lock" aria-hidden="true" (click)="openAdminSignInDialog()"></i>
          </span>
          <span *ngIf="adminIsLoggedIn">
            <i class="fa fa-unlock-alt" aria-hidden="true" (click)="auth.signOut()"></i>
          </span>
        </mat-toolbar>
      </footer>
    </div>
  `
})
export class AppComponent {

  public email: string;
  public password: string;
  public error: string;
  public adminExists = true;
  public adminIsLoggedIn = false;
  public onHomePage = false;

  // for testing
  public items: Observable<any[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFirestore,
              private auth: AuthService,
              private dialog: MatDialog) {
    this.auth.adminUserExists()
      .subscribe(adminExists => this.adminExists = adminExists);
    this.auth.adminLoggedIn()
      .subscribe(adminIsLoggedIn => this.adminIsLoggedIn = adminIsLoggedIn);
    this.router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        map(event => event['url']),
        map(path => (path === '/') as boolean)
      )
      .subscribe(onHomePage => this.onHomePage = onHomePage);
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
