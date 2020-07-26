import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundingCreateGuardService } from '../../service/auth-guard.service';

import { ReceivedFundingFormComponent } from './received-funding-form/received-funding-form.component';
import { AllFundingSummaryComponent } from './all-funding-summary/all-funding-summary.component';
import { FundingDetailsPageComponent} from './funding-details-page/funding-details-page.component'

const routes: Routes = [
  {
    path: '',
    component: AllFundingSummaryComponent
  },
  {
    path: 'add',
    canActivate :[FundingCreateGuardService],
    component: ReceivedFundingFormComponent
  },
  {
    path: ':fundingId',
    component: FundingDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingRoutingModule { }
