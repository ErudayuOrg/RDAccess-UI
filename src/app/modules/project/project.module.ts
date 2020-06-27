import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProjectCreateGuardService } from '../../service/auth-guard.service';
import { ProjectRoutingModule } from './project-routing.module';

import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';


@NgModule({
  declarations: [ProjectPageComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[ProjectCreateGuardService]
})
export class ProjectModule { }
