import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant'

@Component({
  selector: 'app-fp-dates-tile',
  templateUrl: './fp-dates-tile.component.html',
  styleUrls: ['./fp-dates-tile.component.css']
})
export class FpDatesTileComponent implements OnChanges {

  @Input() fundDates:any;   
  @Input() isEditMode:any; 
  @Input() status:string;
  @Output() isFormValid = new EventEmitter<any>();

  isAccepted: boolean;
  fundDatesForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.isAccepted = RD_CONSTANT.FUNDING_STATUS_CODE.ACCEPTED === this.status;
    this.fundDatesForm = this.fb.group({
      received: [this.fundDates?.received?.substring(0,10)],
      start: [this.fundDates?.start?.substring(0,10)],
      end: [this.fundDates?.end?.substring(0,10)],
    });
  }

  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.RECEIVED_FP_TILE_INDEX.AMOUNT,
      value:this.fundDatesForm.invalid
    });
  }

  getFormData(){
    if(this.fundDatesForm.invalid) return null;
    const {received,start,end} = this.fundDatesForm.value;
    return {received,start,end};
  }


}
