import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-gallery',
  styleUrls: ['./project-gallery.component.scss'],
  template: `
    <p>
      project-gallery works!
    </p>
  `
})
export class ProjectGalleryComponent implements OnInit {

  @Input() projects: Observable<Project[]>;

  constructor() { }

  ngOnInit() {
  }

}
