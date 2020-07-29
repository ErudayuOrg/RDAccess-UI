import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-status-card',
  templateUrl: './project-status-card.component.html',
  styleUrls: ['./project-status-card.component.css']
})
export class ProjectStatusCardComponent implements OnChanges {

  @Input() status:any;   
  @Input() isEditMode:any; 

  projectStatus: FormControl;
  badge:String;
  viewStatus: String;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.badge = this.status === RD_CONSTANT.PROJECT_STATUS_CODE.COMPLETED ? 'badge-success' : 'badge-warning';
    this.projectStatus = this.fb.control(this.status);
    this.viewStatus = RD_CONSTANT.PROJECT_STATUS_MAP[this.status];
  }

  getFormData(){
    return this.projectStatus.value;
  }

}
