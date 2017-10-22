import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-gallery',
  styleUrls: ['./project-gallery.component.scss'],
  template: `
    <mat-grid-list [cols]="cols" gutterSize="64px" (window:resize)="onResize($event)">
      <mat-grid-tile
          *ngFor="let project of projects"
          (click)="goToProject(project.projectId)">
        <app-project-preview-card [project]="project"></app-project-preview-card>
      </mat-grid-tile>
    </mat-grid-list>
  `
})
export class ProjectGalleryComponent implements OnInit {

  @Input() projects: Project[];
  public cols = 2;

  constructor(private router: Router) { }

  ngOnInit() { }

  public onResize(event) {
    const width = event.target.innerWidth;
    if (width < 950) {
      this.cols = 2;
    }
    if (width > 950) {
      this.cols = 3;
    }
    if (width < 750) {
      this.cols = 1;
    }
  }

  public goToProject(id: string) {
    this.router.navigate([`project/${id}`]);
  }

}
