import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-header',
  styleUrls: ['./project-header.component.scss'],
  template: `
    <mat-card *ngIf="project">
      <img mat-card-image [src]="project.image">
        <mat-card-content>
        <div class="content">
          <div class="info">
            <h1 class="title">
              {{ project.title }}
            </h1>
            <h2 class="position" *ngIf="project.shortDescription">
              {{ project.shortDescription }}
            </h2>
          </div>
          <div class="description">
            {{ project.description }}
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class ProjectHeaderComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}
