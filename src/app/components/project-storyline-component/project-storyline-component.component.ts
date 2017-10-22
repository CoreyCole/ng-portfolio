import { Component, OnInit, Input } from '@angular/core';

import { StorylineParams } from '../../../models/storyline-params';

@Component({
  selector: 'app-project-storyline-component',
  styleUrls: ['./project-storyline-component.component.scss'],
  template: `
    <div class="text" *ngIf="component.type === 'text'">
      <p>{{ component.data.text }}</p>
    </div>
    <mat-card class="code" *ngIf="component.type === 'code'">
      <mat-card-content highlight-js-content=".highlight">
        <pre>
          <code class="javascript highlight">
            {{ component.data.code }}
          </code>
        </pre>
      </mat-card-content>
    </mat-card>
    <mat-card class="img" *ngIf="component.type === 'image'">
      <img mat-card-image [src]="component.data.imageUrl">
      <mat-card-content>
        <p>{{ component.data.imageCaption }}</p>
      </mat-card-content>
    </mat-card>
  `
})
export class ProjectStorylineComponentComponent implements OnInit {

  @Input() component: StorylineParams;

  constructor() { }

  ngOnInit() {
    console.log(this.component);
    // this.component.data['code'] = `
    //   const hello = () => {
    //     console.log('hello, world');
    //   }
    // `;
  }

}
