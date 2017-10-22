import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { ProjectService } from '../../core/project.service';
import { Project } from '../../../models/project';
import { StorylineParams } from '../../../models/storyline-params';

@Component({
  selector: 'app-edit-project-page',
  styleUrls: ['./edit-project-page.component.scss'],
  template: `
    <div class="project">
      <mat-card>
        <img mat-card-image src="http://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
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
            (click)="projectService.createProject(currentProject)">
          Create Project
        </button>
        <button mat-raised-button color="primary"
            *ngIf="currentProject.projectId !== 'new'"
            (click)="updateProject()">
          Update Project
        </button>
      </mat-card>
      <mat-card *ngIf="newStoryline">
        <app-edit-project-storyline (onSave)="saveStorylineComponent(params)"></app-edit-project-storyline>
      </mat-card>
      <button mat-raised-button color="accent"
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
  public newStoryline: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore,
              public projectService: ProjectService) { }

  ngOnInit() {
    this.currentProject = {
      projectId: '',
      title: '',
      description: '',
      image: '',
      skillTags: []
    };
    this.route.paramMap
      .map((params: ParamMap) => params.get('projectId'))
      .subscribe(projectId => {
        this.currentProject.projectId = projectId;
        if (projectId !== 'new') {
          this.project$ = this.afs.doc<Project>(`projects/${projectId}`).valueChanges();
        }
      });
    this.project$.subscribe(project => this.currentProject = project);
  }

  public createProject() {
    const newProjectId = this.projectService.createProject(this.currentProject);
    console.log(newProjectId)
    // this.router.navigate(['edit', { projectId: newProjectId }]);
  }

  public updateProject() {
    this.projectService.updateProject(this.currentProject);
  }

  public addStorylineComponent() {
    this.newStoryline = true;
  }

  public saveStorylineComponent(newStorylineParams) {
    console.log(newStorylineParams);
    this.newStoryline = false;
  }

}
