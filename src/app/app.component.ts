import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

@Component({
  selector: 'app-root',
  template: `
    <h3>Basic Buttons</h3>
    <div>
      <button mat-button>Basic</button>
      <button mat-button color="primary">Primary</button>
      <button mat-button color="accent">Accent</button>
      <button mat-button color="warn">Warn</button>
      <button mat-button disabled>Disabled</button>
      <a mat-button routerLink=".">Link</a>
    </div>

    <h3>Raised Buttons</h3>
    <div>
      <button mat-raised-button>Basic</button>
      <button mat-raised-button color="primary">Primary</button>
      <button mat-raised-button color="accent">Accent</button>
      <button mat-raised-button color="warn">Warn</button>
      <button mat-raised-button disabled>Disabled</button>
      <a mat-raised-button routerLink=".">Link</a>
    </div>
    <ul *ngFor="let itemDoc of items | async">
      <li *ngFor="let itemIndex of keys(itemDoc)">
        {{itemIndex}} : {{itemDoc[itemIndex]}}
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

  public keys(object: object) {
    return Object.keys(object);
  }
}
