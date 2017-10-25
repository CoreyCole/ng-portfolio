import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-toolbar',
  styleUrls: ['./scroll-toolbar.component.scss'],
  template: `
    <mat-toolbar class="sticky" color="primary">
      <a routerLink="/">
        <app-logo></app-logo>
        <span class="title" *ngIf="scrolled">{{ title }}</span>
      </a>
    </mat-toolbar>
    <mat-toolbar color="primary">
      <mat-toolbar-row></mat-toolbar-row>
    </mat-toolbar>
  `
})
export class ScrollToolbarComponent implements OnInit {

  @Input() title: string;
  public scrolled = false;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll(event) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 128) {
      this.scrolled = true;
    } else if (scrollPosition === 0) {
      this.scrolled = false;
    }
  }

  ngOnInit() {
  }

}
