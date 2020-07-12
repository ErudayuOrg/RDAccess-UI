import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-project-status-card',
  templateUrl: './project-status-card.component.html',
  styleUrls: ['./project-status-card.component.css']
})
export class ProjectStatusCardComponent implements OnChanges {

  @Input() status:any;   
  @Input() isEditMode:any; 

  projectStatus: FormControl;
  badge:string;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.badge = this.status === 'Completed' ? 'badge-success' : 'badge-warning';
    this.projectStatus = this.fb.control(this.status);
  }

  getFormData(){
    return this.projectStatus.value;
  }

}
