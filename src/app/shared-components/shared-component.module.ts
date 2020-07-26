import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SnapshotTilesComponent} from './snapshot-tiles/snapshot-tiles.component';
import { MessageComponent } from './message/message.component';
import { LoaderComponent } from './loader/loader.component';
import { DateTileComponent } from './date-tile/date-tile.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { UpdateConfirmationModalComponent } from './modals/update-confirmation-modal/update-confirmation-modal.component';


@NgModule({
  declarations: [
    SnapshotTilesComponent,
    MessageComponent,
    LoaderComponent,
    DateTileComponent,
    EmptyLayoutComponent,
    UpdateConfirmationModalComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SnapshotTilesComponent,
    MessageComponent,
    LoaderComponent,
    DateTileComponent,
    EmptyLayoutComponent,
    UpdateConfirmationModalComponent
  ]
})
export class SharedComponentModule { }
