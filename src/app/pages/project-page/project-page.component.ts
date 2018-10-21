import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Project } from '../../../models/project';
import { StorylineParams } from '../../../models/storyline-params';

import { ProjectService } from '../../core/project.service';

@Component({
  selector: 'app-project-page',
  styleUrls: ['./project-page.component.scss'],
  template: `
    <div class="header push-up">
      <app-project-header [project]="project$ | async"></app-project-header>
    </div>
    <div class="storyline">
      <app-project-storyline [components]="storyline$ | async"></app-project-storyline>
    </div>
  `
})
export class ProjectPageComponent implements OnInit {

  public project$: Observable<Project>;
  public storyline$: Observable<StorylineParams[]>;

  constructor(private afs: AngularFirestore,
              private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('projectId')),
      mergeMap(projectId => this.projectService.getProject(projectId))
    );
    this.storyline$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('projectId')),
      mergeMap(projectId => this.projectService.getProjectStorylineComponents(projectId))
    );
  }

}
