import { Component, OnInit } from '@angular/core';

// tslint:disable:max-line-length
@Component({
  selector: 'app-intro-card',
  styleUrls: ['./intro-card.component.scss'],
  template: `
    <mat-card>
      <div class="img">
        <img src="https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/14137994_10205844544986449_8679723115539772464_o.jpg?oh=b9c4dc3de2332f39cfa6f92277aef268&oe=5A7F428E" alt="introduction image">
      </div>
      <div class="content">
        <div class="profile-info">
          <h1 class="profile-title">
            Corey Cole
          </h1>
          <h2 class="profile-position">
            Problem Finder, Problem Solver, Solution Implementer
          </h2>
        </div>
        <div class="profile-description">
          I'm currently seeking new job opportunities.
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
