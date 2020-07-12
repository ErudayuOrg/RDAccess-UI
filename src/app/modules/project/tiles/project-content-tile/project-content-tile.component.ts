import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-content-tile',
  templateUrl: './project-content-tile.component.html',
  styleUrls: ['./project-content-tile.component.css']
})
export class ProjectContentTileComponent implements OnChanges {
  @Input() projectContent:any;   
  @Input() isEditMode:any;   
  @Output() isFormValid = new EventEmitter<any>();
  
  projectContentForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  
  ngOnChanges(): void {
    this.projectContentForm = this.fb.group({
      subSection: this.fb.array(this.populateSubSectionGroup())
    });
  }
  
  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.PROJECT_TILE_INDEX.CONTENT, 
      value:this.projectContentForm.invalid
    });
  }
  populateSubSectionGroup(){
    let initialSubSectionArray = [];
    this.projectContent.forEach( cont =>{
      initialSubSectionArray.push(  this.fb.group({
        subHeading:[cont.subHeading,[Validators.required, Validators.minLength(3)]],
        subContent:[cont.subContent,[Validators.required, Validators.minLength(10)]]
      }));
    });
    return initialSubSectionArray;
  }
  
  get subSectionArray(){
    return <FormArray>this.projectContentForm.get('subSection');
  }

  addSubSection(){
    this.subSectionArray.push(this.getNewSubsection())
  }

  getNewSubsection(){
    return this.fb.group({
      subHeading:['',[Validators.required, Validators.minLength(3)]],
      subContent:['',[Validators.required, Validators.minLength(10)]]
    })
  }

  deleteSubSection(index){
    this.subSectionArray.removeAt(index);
  }
  
  getFormData(){
    if(this.projectContentForm.invalid) return null;
    const {subSection} = this.projectContentForm.value;
    return subSection;
  }

}
