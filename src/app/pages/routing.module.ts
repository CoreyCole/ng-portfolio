import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { EditProjectPageComponent } from './edit-project-page/edit-project-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'project/:projectId', component: ProjectPageComponent },
  { path: 'edit/:projectId', component: EditProjectPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
