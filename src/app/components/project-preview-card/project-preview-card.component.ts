import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../models/project';

// tslint:disable:max-line-length
@Component({
  selector: 'app-project-preview-card',
  styleUrls: ['./project-preview-card.component.scss'],
  template: `
    <mat-card>
      <img mat-card-image *ngIf="project.image" [src]="project.image">
      <img mat-card-image *ngIf="!project.image"
        src="https://firebasestorage.googleapis.com/v0/b/corey-portfolio.appspot.com/o/ng-portfolio-logo-with-background.png?alt=media&token=50635dca-4618-4d1a-a2e4-4c622b340b66">
      <mat-card-title>
        <h1>{{ project.title }}</h1>
      </mat-card-title>
    </mat-card>
  `
})
export class ProjectPreviewCardComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
