import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateGuardService } from '../../service/auth-guard.service';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectContentTileComponent } from './tiles/project-content-tile/project-content-tile.component';
import { ProjectSummaryTileComponent } from './tiles/project-summary-tile/project-summary-tile.component';
import { ProjectReferencesTileComponent } from './tiles/project-references-tile/project-references-tile.component';
import { ProjectKeywordsTileComponent } from './tiles/project-keywords-tile/project-keywords-tile.component';
import { ProjectStatusCardComponent } from './cards/project-status-card/project-status-card.component';
import { ProjectContributorsCardComponent } from './cards/project-contributors-card/project-contributors-card.component';
import { ProjectTitleTileComponent } from './tiles/project-title-tile/project-title-tile.component';
import { ProjectHistoryModalComponent } from './modals/project-history-modal/project-history-modal.component';
import { ProjectUpdateModalComponent } from './modals/project-update-modal/project-update-modal.component';
import { AllProjectSummaryComponent } from './all-project-summary/all-project-summary.component';
import { ProjectFundingCardComponent } from './cards/project-funding-card/project-funding-card.component';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectFormComponent,
    ProjectContentTileComponent,
    ProjectSummaryTileComponent,
    ProjectReferencesTileComponent,
    ProjectKeywordsTileComponent,
    ProjectStatusCardComponent,
    ProjectContributorsCardComponent,
    ProjectTitleTileComponent,
    ProjectHistoryModalComponent,
    ProjectUpdateModalComponent,
    AllProjectSummaryComponent,
    ProjectFundingCardComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentModule
  ],
  providers: [ProjectCreateGuardService],
})
export class ProjectModule {}
