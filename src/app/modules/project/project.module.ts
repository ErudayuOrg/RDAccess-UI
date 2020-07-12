import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateGuardService } from '../../service/auth-guard.service';

import { LoaderComponent } from '../../shared-components/loader/loader.component';
import { MessageComponent } from '../../shared-components/message/message.component';
import { DateTileComponent } from'../../shared-components/date-tile/date-tile.component';

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
    LoaderComponent,
    MessageComponent,
    ProjectUpdateModalComponent,
    DateTileComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProjectCreateGuardService],
})
export class ProjectModule {}
