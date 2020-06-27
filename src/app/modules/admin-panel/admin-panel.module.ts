import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ResearchLabFormComponent } from './research-lab-form/research-lab-form.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [DepartmentFormComponent, ResearchLabFormComponent, UserFormComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminPanelModule { }
