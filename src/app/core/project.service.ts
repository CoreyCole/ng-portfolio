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
    const projectsCollection = this.afs.collection<Project>('projects', ref => ref.orderBy('rank'));
    return projectsCollection.valueChanges();
  }

  // Get project with projectId
  public getProject(projectId: String): Observable<Project> {
    const projectRef = this.afs.doc<Project>(`projects/${projectId}`);
    return projectRef.valueChanges();
  }

  public createProject(params: Object): string {
    const projectId = this.afs.createId();
    const project: Project = {
      projectId: projectId,
      rank: params['rank'],
      title: params['title'],
      description: params['description'],
      image: params['image'],
      skillTags: params['skillTags']
    };
    const projectRef = this.afs.doc<Project>(`projects/${projectId}`);
    projectRef.set(project);

    return projectId;
  }

  public updateProject(params: Object) {
    const project: Project = {
      projectId: params['projectId'],
      rank: params['rank'],
      title: params['title'],
      description: params['description'],
      image: params['image'],
      skillTags: params['skillTags']
    };
    const projectRef = this.afs.doc<Project>(`projects/${params['projectId']}`);

    return projectRef.update(project);
  }

  public addProjectStorylineComponent(projectId: string, params: StorylineParams) {
    const projectRef = this.afs.doc<Project>(`projects/${projectId}`);
    const componentsRef = projectRef.collection<StorylineParams>(`/components`);
    return componentsRef.add(params);
  }

  public getProjectStorylineComponents(projectId: string) {
    const componentsRef = this.afs.collection<StorylineParams>(`projects/${projectId}/components`, ref => ref.orderBy('rank'));
    return componentsRef.valueChanges();
  }

}
