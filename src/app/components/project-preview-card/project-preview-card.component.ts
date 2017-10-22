import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-preview-card',
  styleUrls: ['./project-preview-card.component.scss'],
  template: `
    <mat-card>
      <img mat-card-image [src]="project.image">
      <mat-card-content>
        {{ project.title }}
      </mat-card-content>
    </mat-card>
  `
})
export class ProjectPreviewCardComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
