import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationCreateGuardService } from '../../service/auth-guard.service';

import { PublicationFormComponent } from './publication-form/publication-form.component';
import { AllPublicationSummaryComponent } from './all-publication-summary/all-publication-summary.component';

const routes: Routes = [
  {
    path: '',
    component: AllPublicationSummaryComponent
  },
  {
    path: 'add',
    canActivate :[PublicationCreateGuardService],
    component: PublicationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
