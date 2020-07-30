import { Component, OnChanges, Input } from '@angular/core';
import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-fp-ack-tile',
  templateUrl: './fp-ack-tile.component.html',
  styleUrls: ['./fp-ack-tile.component.css']
})
export class FpAckTileComponent implements OnChanges {
  @Input() status:string;
  @Input() documents:any;

  isChecked:boolean;
  isSubmitted:boolean;
  constructor() { }

  ngOnChanges(): void {
    this.isChecked =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.CHECKED;
    this.isSubmitted =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.SUBMITTED;
  }
  
  uploadAck(){
    //set status to 04
  }

}
