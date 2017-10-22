import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <i id="icon" class="fa fa-folder"></i>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
