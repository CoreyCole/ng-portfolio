import { Component, OnInit } from '@angular/core';

// tslint:disable:max-line-length
@Component({
  selector: 'app-intro-card',
  styleUrls: ['./intro-card.component.scss'],
  template: `
    <mat-card>
      <img mat-card-image src="https://firebasestorage.googleapis.com/v0/b/corey-portfolio.appspot.com/o/tech-profile-pic.jpg?alt=media&token=f3f920f3-849d-4b8a-bc29-b930b0387ec8" alt="introduction image">
      <div class="content">
        <div class="profile-info">
          <h1 class="profile-title">
            Corey Cole
          </h1>
          <h2 class="profile-position">
            Leader, Full-Stack Engineer, Entrepreneur
          </h2>
        </div>
        <div class="profile-description">
          I'm happily employed and I'm not pursuing new opportunities.
        </div>
      </div>
    </mat-card>
  `
})
export class IntroCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
