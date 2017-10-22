import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';

// other 3rd party components
import { TagInputModule } from 'ngx-chips';

// angular fire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './core/firebase-config';

// pages
import { AppRoutingModule } from './pages/routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { EditProjectPageComponent } from './pages/edit-project-page/edit-project-page.component';

// components
import { IntroCardComponent } from './components/intro-card/intro-card.component';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';
import { ProjectPreviewCardComponent } from './components/project-preview-card/project-preview-card.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ProjectStorylineComponent } from './components/project-storyline/project-storyline.component';
import { ProjectStorylineComponentComponent } from './components/project-storyline-component/project-storyline-component.component';
import { AdminAuthDialogComponent } from './components/admin-auth-dialog/admin-auth-dialog.component';
import { ScrollToolbarComponent } from './components/scroll-toolbar/scroll-toolbar.component';
import { EditProjectStorylineComponent } from './components/edit-project-storyline/edit-project-storyline.component';

@NgModule({
  declarations: [
    AppComponent,
    // pages
    HomePageComponent,
    ProjectPageComponent,
    EditProjectPageComponent,
    // components
    IntroCardComponent,
    ProjectGalleryComponent,
    ProjectPreviewCardComponent,
    ProjectHeaderComponent,
    ProjectStorylineComponent,
    ProjectStorylineComponentComponent,
    AdminAuthDialogComponent,
    ScrollToolbarComponent,
    EditProjectStorylineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AdminAuthDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
