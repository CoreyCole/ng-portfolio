import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-project-page',
  styleUrls: ['./edit-project-page.component.scss'],
  template: `
    <p>{{this.projectId | async}}</p>
  `
})
export class EditProjectPageComponent implements OnInit {

  public projectId: Observable<string>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.paramMap
      .map((params: ParamMap) => params.get('projectId'));
  }

}
