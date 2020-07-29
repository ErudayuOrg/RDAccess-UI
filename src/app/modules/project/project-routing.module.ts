import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCreateGuardService } from '../../service/auth-guard.service';

import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { AllProjectSummaryComponent } from './all-project-summary/all-project-summary.component';


const routes: Routes = [
  {
    path: '',
    component: AllProjectSummaryComponent
  },
  {
    path: 'add',
    canActivate :[ProjectCreateGuardService],
    component: ProjectFormComponent
  },
  {
    path: ':projectId',
    component: ProjectPageComponent
  },
  {
    path: ':projectId/:edit',
    component: ProjectPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
