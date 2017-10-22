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
    const projectsCollection = this.afs.collection<Project>('projects');
    return projectsCollection.valueChanges();
  }

  // Get project with id of projectId
  public getProject(projectId: String) {
    const projectRef = this.afs.collection('projects', ref => ref.where('projectId', '==', projectId));
    return projectRef.valueChanges();
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
          skillTags: params['skillTags']
        };
        const projectRef = this.afs.doc<Project>(`projects/${projectId}`);

        return projectRef.set(project);
      });
  }

  public updateProject(params: Object) {
    this.auth.adminLoggedIn()
      .filter(isAdmin => isAdmin)
      .subscribe(() => {
        const project: Project = {
          projectId: params['projectId'],
          title: params['title'],
          description: params['description'],
          image: params['image'],
          skillTags: params['skillTags']
        };
        const projectRef = this.afs.doc<Project>(`projects/${params['projectId']}`);

        return projectRef.update(project);
      });
  }

  public addProjectStorylineComponent(projectId: string, type: string, data: StorylineParams) {
    const projectRef = this.afs.doc<Project>(`projects/${projectId}`);
    const componentsRef = projectRef.collection<StorylineParams>(`/components`);
    return componentsRef.add({
        type: type,
        data: data
    });
  }

}
