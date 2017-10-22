import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { ProjectService } from '../../core/project.service';
import { Project } from '../../../models/project';
import { StorylineParams } from '../../../models/storyline-params';

@Component({
  selector: 'app-edit-project-page',
  styleUrls: ['./edit-project-page.component.scss'],
  template: `
    <div class="project">
      <mat-card>
        <img mat-card-image [src]="sanitizer.bypassSecurityTrustUrl(currentProject.image)">
        <form class="form">
          <mat-form-field class="full-width">
            <input matInput [(ngModel)]='currentProject.title' placeholder="Title" name="title" value="">
          </mat-form-field>
          <mat-form-field class="full-width">
            <input matInput [(ngModel)]='currentProject.image' placeholder="Image Url" name="image" value="">
          </mat-form-field>
          <mat-form-field class="full-width">
            <textarea matInput [(ngModel)]='currentProject.description' placeholder="Description" name="description" value=""></textarea>
          </mat-form-field>
          <tag-input name="skillTags" [(ngModel)]='currentProject.skillTags'></tag-input>
        </form>
        <button mat-raised-button color="primary"
            *ngIf="currentProject.projectId === 'new'"
            [disabled]="!currentProject.title"
            (click)="createProject()">
          Create Project
        </button>
        <button mat-raised-button color="primary"
            *ngIf="currentProject.projectId !== 'new'"
            (click)="updateProject()">
          Update Project
        </button>
      </mat-card>
      <app-project-storyline [components]="storyline$ | async"></app-project-storyline>
      <mat-card *ngIf="newStoryline">
        <app-edit-project-storyline (onSave)="saveStorylineComponent($event)"></app-edit-project-storyline>
      </mat-card>
      <button mat-raised-button class="add-storyline" color="accent"
          *ngIf="currentProject.projectId !== 'new' && !newStoryline"
          (click)="addStorylineComponent()">
        Add Storyline Component
      </button>
    </div>
  `
})
export class EditProjectPageComponent implements OnInit {

  public currentProject: Project;
  public project$: Observable<Project>;
  public storyline$: Observable<StorylineParams[]>;
  public newStoryline: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              public sanitizer: DomSanitizer,
              public projectService: ProjectService) { }

  ngOnInit() {
    this.currentProject = {
      projectId: '',
      title: '',
      description: '',
      image: '',
      skillTags: [],
      components: []
    };
    this.project$ = this.route.paramMap.map((params: ParamMap) => params.get('projectId'))
      .mergeMap(projectId => this.projectService.getProject(projectId));
    this.storyline$ = this.route.paramMap.map((params: ParamMap) => params.get('projectId'))
      .mergeMap(projectId => this.projectService.getProjectStorylineComponents(projectId));

    this.route.paramMap.map((params: ParamMap) => params.get('projectId'))
      .subscribe(projectId => this.currentProject.projectId = projectId);
    this.project$
      .filter(project => !!project)
      .subscribe(project => this.currentProject = project);
  }

  public createProject() {
    this.afs.collection<Project>('projects/').valueChanges()
      .map(projects => projects.length)
      .take(1)
      .subscribe(rank => {
        this.currentProject.rank = rank;
        const newProjectId = this.projectService.createProject(this.currentProject);
        this.router.navigate([`edit/${newProjectId}`]);
      });
  }

  public updateProject() {
    this.projectService.updateProject(this.currentProject);
  }

  public addStorylineComponent() {
    this.newStoryline = true;
  }

  public saveStorylineComponent(newStorylineParams) {
    this.storyline$
      .map(components => components.length)
      .take(1)
      .subscribe(rank => {
        newStorylineParams.rank = rank;
        this.projectService.addProjectStorylineComponent(this.currentProject.projectId, newStorylineParams);
      });
    this.newStoryline = false;
  }

}
