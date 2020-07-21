import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundingCreateGuardService } from '../../service/auth-guard.service';

import { FundingFormComponent } from './funding-form/funding-form.component';

const routes: Routes = [
  {
    path: 'add',
    canActivate :[FundingCreateGuardService],
    component: FundingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingRoutingModule { }
