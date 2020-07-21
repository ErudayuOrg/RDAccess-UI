import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnapshotTilesComponent} from './snapshot-tiles/snapshot-tiles.component';
import { MessageComponent } from './message/message.component';
import { LoaderComponent } from './loader/loader.component';
import { DateTileComponent } from './date-tile/date-tile.component';


@NgModule({
  declarations: [
    SnapshotTilesComponent,
    MessageComponent,
    LoaderComponent,
    DateTileComponent
    ],
  imports: [
    CommonModule
  ],
  exports:[
    SnapshotTilesComponent,
    MessageComponent,
    LoaderComponent,
    DateTileComponent
  ]
})
export class SharedComponentModule { }
