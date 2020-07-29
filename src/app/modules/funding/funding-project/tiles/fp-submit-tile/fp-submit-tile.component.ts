import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { RD_CONSTANT } from '../../../../../keys/constant'

@Component({
  selector: 'app-fp-submit-tile',
  templateUrl: './fp-submit-tile.component.html',
  styleUrls: ['./fp-submit-tile.component.css']
})
export class FpSubmitTileComponent implements OnChanges {
  @Input() isEditMode:any; 
  @Input() status:string;

  isChecked: boolean

  constructor() { }

  ngOnChanges(): void {
    this.isChecked =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.CHECKED;
  }

}
