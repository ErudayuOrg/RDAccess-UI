import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundingRoutingModule } from './funding-routing.module';
import { FundingFormComponent } from './funding-form/funding-form.component';


@NgModule({
  declarations: [FundingFormComponent],
  imports: [
    CommonModule,
    FundingRoutingModule
  ]
})
export class FundingModule { }
