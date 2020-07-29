import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundingCreateGuardService } from '../../service/auth-guard.service';

import { AllFundingSummaryComponent } from './funding-call/all-funding-summary/all-funding-summary.component';
import { FundingDetailsPageComponent} from './funding-call/funding-details-page/funding-details-page.component'

import { ReceivedFundingFormComponent } from './funding-project/received/received-funding-form/received-funding-form.component';
import { ReceivedFpDetailsPageComponent } from './funding-project/received/received-fp-details-page/received-fp-details-page.component';
import {AppliedFpDetailsPageComponent} from './funding-project/applied/applied-fp-details-page/applied-fp-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: AllFundingSummaryComponent
  },
  {
    path: 'applied/:fundingProjectId',
    component: AppliedFpDetailsPageComponent
  },
  {
    path: 'applied/:fundingProjectId/:edit',
    component: AppliedFpDetailsPageComponent
  },
  {
    path: 'received',
    canActivate :[FundingCreateGuardService],
    component: ReceivedFundingFormComponent
  },
  {
    path: 'received/:fundingProjectId',
    component: ReceivedFpDetailsPageComponent
  },
  {
    path: 'received/:fundingProjectId/:edit',
    component: ReceivedFpDetailsPageComponent
  },
  {
    path: ':fundingId',
    component: FundingDetailsPageComponent
  },
  {
    path: ':fundingId/:edit',
    component: FundingDetailsPageComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingRoutingModule { }
