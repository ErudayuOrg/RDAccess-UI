import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { AllPublicationSummaryComponent } from './all-publication-summary/all-publication-summary.component';


@NgModule({
  declarations: [PublicationFormComponent, AllPublicationSummaryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicationRoutingModule,
    SharedComponentModule
  ]
})
export class PublicationModule { }
