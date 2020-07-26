import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ResearchLabFormComponent } from './research-lab-form/research-lab-form.component';
import { FundingFormComponent } from './funding-form/funding-form.component';

const routes: Routes = [
  {
    path: 'department',
    component:DepartmentFormComponent
  },
  {
    path: 'research-lab',
    component:ResearchLabFormComponent
  },
  {
    path: 'user',
    component:UserFormComponent
  },
  {
    path: 'funding',
    component:FundingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
