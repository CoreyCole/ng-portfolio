import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IntroCardComponent } from './intro-card/intro-card.component';
import { ProjectGalleryComponent } from './project-gallery/project-gallery.component';
import { ProjectPreviewCardComponent } from './project-preview-card/project-preview-card.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectStorylineComponent } from './project-storyline/project-storyline.component';
import { ProjectStorylineComponentComponent } from './project-storyline-component/project-storyline-component.component';
import { EditProjectStorylinePageComponent } from './pages/edit-project-storyline-page/edit-project-storyline-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpPageComponent,
    HomePageComponent,
    IntroCardComponent,
    ProjectGalleryComponent,
    ProjectPreviewCardComponent,
    ProjectPageComponent,
    ProjectHeaderComponent,
    ProjectStorylineComponent,
    ProjectStorylineComponentComponent,
    EditProjectStorylinePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
