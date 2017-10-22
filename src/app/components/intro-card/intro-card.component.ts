import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-card',
  styleUrls: ['./intro-card.component.scss'],
  template: `
    <p>
      intro-card works!
    </p>
  `
})
export class IntroCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
