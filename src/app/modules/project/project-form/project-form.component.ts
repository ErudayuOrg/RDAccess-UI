import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

import { ApiClientService } from './../../../service/api-client.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})

export class ProjectFormComponent implements OnInit {
  project = new FormGroup({
    projectTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    projectSummary: new FormControl('',[Validators.required, Validators.minLength(10)]),
    projectDepartment: new FormControl('',[Validators.required]),
    projectLab: new FormControl('', [Validators.required]),
    searchedContributorId: new FormControl('')
  });
  departments:any;
  researchLabs:any;
  team:any;
  userId:any;
  contributorIds:any = [];
  successMessage:string;
  constructor(private service:ApiClientService) { }

  ngOnInit(): void {
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId,
                   "departmentName" :dept.departmentName,
                   "researchLab":dept.researchLab})
      );
      this.departments = allDepartments;
    });
    this.userId = localStorage.getItem('USERID');
    this.team = [this.userId]; 
  }

  getLabs(deptId){
    this.researchLabs= this.departments.filter(dept => dept.departmentId === deptId)[0].researchLab;
  }

  searchContributorIds(searchId){
    if( this.contributorIds.length === 0 || searchId !== this.contributorIds[0]){
      this.service.getMatchingUserId(searchId).subscribe(userIds=>{
        this.contributorIds = userIds;
      })
    } 
  }

  addContributorToTeam(contributorId){
    if(!this.team.includes(contributorId) && contributorId != "" && this.team.length < 2){
      this.team.push(contributorId);
      this.project.value.searchedContributorId="";
    }
      
  }

  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.userId));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  createProject(){
    const {searchedContributorId, ...projectDetails } = this.project.value;
    projectDetails.team = this.team;
    projectDetails.projectDepartment =[projectDetails.projectDepartment];
    projectDetails.projectLab =[projectDetails.projectLab];
    this.service.createNewProject(projectDetails).subscribe( response =>{
      this.successMessage = response.message;
      this.project.reset();
      this.team=[this.userId];
    })
  }

}
