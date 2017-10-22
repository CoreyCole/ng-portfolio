import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from './auth.service';
import { Project } from '../../models/project';
import { StorylineParams } from '../../models/storyline-params';

@Injectable()
export class ProjectService {

  constructor(private afs: AngularFirestore,
              private auth: AuthService) { }

  public getProjects(): Observable<Project[]> {
    return Observable.of([]);
  }

  public createProject(params: Object) {
    const projectId = this.afs.createId();
    this.auth.adminLoggedIn()
      .filter(isAdmin => isAdmin)
      .subscribe(() => {
        const project: Project = {
          projectId: projectId,
          title: params['title'],
          description: params['description'],
          image: params['image'],
          skillTags: params['skillTags'],
          components: params['components']
        };
        const projectRef = this.afs.doc<Project>(`projects/${projectId}`);
        return projectRef.set(project);
      });
  }

  // Get project with id of projectId
  public getProject(projectId: String) {
    const projectRef = this.afs.collection('projects', ref => ref.where('projectId', '==', projectId));
    return projectRef.valueChanges();
  }

  public updateProject(projectId: String, project: Project) {
    const projectRef = this.afs.doc<Project>(`projects/${projectId}`);
    return projectRef.set(project);
  }
}
