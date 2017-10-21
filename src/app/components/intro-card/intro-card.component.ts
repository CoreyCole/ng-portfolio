import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-card',
  template: `
    <p>
      intro-card works!
    </p>
  `,
  styleUrls: ['./intro-card.component.scss']
})
export class IntroCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
