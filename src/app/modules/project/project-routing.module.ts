import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCreateGuardService } from '../../service/auth-guard.service';

import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate :[ProjectCreateGuardService],
    component: ProjectFormComponent
  },
  {
    path: ':projectId',
    component: ProjectPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
