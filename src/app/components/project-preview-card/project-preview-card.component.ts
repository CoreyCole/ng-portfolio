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
        src="https://firebasestorage.googleapis.com/v0/b/corey-portfolio.appspot.com/o/ng-portfolio-logo-with-background.png?alt=media&token=e2d57c5f-da90-4f52-922b-32a646ae4e04">
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
