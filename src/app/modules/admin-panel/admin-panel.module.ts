import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ResearchLabFormComponent } from './research-lab-form/research-lab-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FundingFormComponent } from './funding-form/funding-form.component';

import { SharedComponentModule } from '../../shared-components/shared-component.module';


@NgModule({
  declarations: [DepartmentFormComponent, ResearchLabFormComponent, UserFormComponent, FundingFormComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    SharedComponentModule
  ]
})
export class AdminPanelModule { }
