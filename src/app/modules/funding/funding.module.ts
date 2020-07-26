import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { FundingRoutingModule } from './funding-routing.module';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { ReceivedFundingFormComponent } from './received-funding-form/received-funding-form.component';
import { AllFundingSummaryComponent } from './all-funding-summary/all-funding-summary.component';
import { FundingDetailsPageComponent } from './funding-details-page/funding-details-page.component';
import { FundingDescriptionTileComponent } from './tiles/funding-description-tile/funding-description-tile.component';
import { FundingAdditionalDetailsTileComponent } from './tiles/funding-additional-details-tile/funding-additional-details-tile.component';
import { FundingHeaderSectionTileComponent } from './tiles/funding-header-section-tile/funding-header-section-tile.component';
import { FundingLinksCardComponent } from './cards/funding-links-card/funding-links-card.component';

@NgModule({
  declarations: [ReceivedFundingFormComponent, AllFundingSummaryComponent, FundingDetailsPageComponent, FundingDescriptionTileComponent, FundingAdditionalDetailsTileComponent, FundingHeaderSectionTileComponent, FundingLinksCardComponent],
  imports: [
    CommonModule,
    FundingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentModule
  ]
})
export class FundingModule { }
