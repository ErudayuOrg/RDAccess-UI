import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snapshot-tiles',
  templateUrl: './snapshot-tiles.component.html',
  styleUrls: ['./snapshot-tiles.component.css']
})

export class SnapshotTilesComponent{
  @Input() snapshot: any;
}
