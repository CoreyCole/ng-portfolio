import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProjectService } from '../../core/project.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-home-page',
  styleUrls: ['./home-page.component.scss'],
  template: `
    <div class="header">
      <app-intro-card></app-intro-card>
      <div class="spacing"></div>
    </div>
    <app-project-gallery [projects]="projects | async"></app-project-gallery>
  `
})
export class HomePageComponent implements OnInit {

  public projects: Observable<Project[]>;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }

}
