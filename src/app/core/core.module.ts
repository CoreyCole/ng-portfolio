import { NgModule } from '@angular/core';

// firebase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AuthService } from './auth.service';
import { ProjectService } from './project.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    ProjectService
  ]
})
export class CoreModule { }
