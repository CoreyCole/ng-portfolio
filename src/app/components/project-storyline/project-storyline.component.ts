import { Component, OnInit, Input } from '@angular/core';

import { StorylineParams } from '../../../models/storyline-params';

@Component({
  selector: 'app-project-storyline',
  styleUrls: ['./project-storyline.component.scss'],
  template: `
    <app-project-storyline-component
      *ngFor="let component of components"
      [component]="component">
    </app-project-storyline-component>
  `
})
export class ProjectStorylineComponent implements OnInit {

  @Input() components: StorylineParams[];

  constructor() { }

  ngOnInit() {
  }

}
