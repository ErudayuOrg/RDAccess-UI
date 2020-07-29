import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant'
@Component({
  selector: 'app-fp-check-tile',
  templateUrl: './fp-check-tile.component.html',
  styleUrls: ['./fp-check-tile.component.css']
})
export class FpCheckTileComponent implements OnChanges {
  @Input() isEditMode:any; 
  @Input() status:string;
  
  isSubmitted: boolean
  constructor() { }
  ngOnChanges(): void {
    this.isSubmitted =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.SUBMITTED;
  }

}
