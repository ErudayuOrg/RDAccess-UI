import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';

import{ getYesterdayDate } from '../../../utils/project.utils';

import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-received-funding-form',
  templateUrl: './received-funding-form.component.html',
  styleUrls: ['./received-funding-form.component.css']
})

export class ReceivedFundingFormComponent implements OnInit {
  receivedFundingForm: FormGroup;
  userId:string;
  lastDate:string = getYesterdayDate();
  constructor(
    private fb: FormBuilder,
    private service:ApiClientService) { }

  ngOnInit(): void {
    this.receivedFundingForm = this.fb.group({
      nameOfGrant: ['', [Validators.required, Validators.minLength(5)]],
      grantGivingOrganisation: ['', [Validators.required, Validators.minLength(5)]],
      descriptionOfScheme: ['', [Validators.required, Validators.minLength(5)]],
      project: this.fb.group({
        projectTitle: ['', [Validators.required, Validators.minLength(8)]],
        projectId: ['', [Validators.required]]
      }),
      submittedDate: ['', [Validators.required]],
      projectSearchList : this.fb.array([]),
    });
  }

  get projectSearchList(){
    return <FormArray>this.receivedFundingForm.get('projectSearchList');
  }

  setProjectList(projectList){
    this.clearProjectSearchList();
    projectList.forEach( project =>{
        this.projectSearchList.push(this.fb.group({
          projectTitle:[project.projectTitle],
          projectId:[project.projectId]
        }));
    });
  }

  searchUserProject(){
    this.clearProjectSearchList();
    const {project} = this.receivedFundingForm.value;
    if(project.projectTitle.length > 3){
      this.service.getMatchingProject(project.projectTitle)
        .subscribe(projectList=>{ this.setProjectList(projectList) });
    } 
  }

  clearProjectSearchList(){
    while ( this.projectSearchList.length !== 0) {
      this.projectSearchList.removeAt(0);
    }
  }

  setProject(index){
    let selectedProject = this.projectSearchList.value[index];
    this.receivedFundingForm.controls['project'].setValue(selectedProject);
    this.clearProjectSearchList();
  }
  
  addReceivedFunding(){
    console.log( this.receivedFundingForm.value);
    this.receivedFundingForm.reset();
  }

}
