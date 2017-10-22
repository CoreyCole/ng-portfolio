import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../models/project';
import { StorylineParams } from '../../models/storyline-params';

@Injectable()
export class ProjectService {

  constructor() { }

  public getProjects(): Observable<Project[]> {
    return Observable.of([]);
  }

}
