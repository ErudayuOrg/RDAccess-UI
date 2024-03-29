import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import{ RD_CONSTANT} from '../../../keys/constant';

import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../utils/project.utils';

import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from './../../../service/api-client.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})

export class ProjectFormComponent implements OnInit {
  lastDate = getYesterdayDate();
  project = new FormGroup({
    projectTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    projectSummary: new FormControl('',[Validators.required, Validators.minLength(10)]),
    projectDepartment: new FormControl('',[Validators.required]),
    projectLab: new FormControl('', [Validators.required]),
    createdAt: new FormControl(this.lastDate),
    isOldProject: new FormControl('', [Validators.required]),
    searchedContributorId: new FormControl('')
  });
  departments:any;
  researchLabs:any;
  team:any;
  userIdName:any;
  contributorIds:any = [];
  successMessage:string;
  errorMessage:string;
  constructor(
    private service:ApiClientService,
    private globalStore :GlobalStoreService,
    private router:Router
    ) { }

  ngOnInit(): void {
    const {userId,userName} = this.globalStore.getGlobalStore();
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId,
                   "departmentName" :dept.departmentName,
                   "researchLab":dept.researchLab})
      );
      this.departments = allDepartments;
    });
    this.userIdName = `${userId}-${userName}`;
    this.team = [this.userIdName]; 
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
    if(!this.team.includes(contributorId) && 
      contributorId != "" && 
      this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT){
        this.team.push(contributorId);
        this.project.patchValue({searchedContributorId:""});
    }   
  }

  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  createProject(){
    const {searchedContributorId, ...projectDetails } = this.project.value;
    projectDetails.team = filterUserId(this.team);
    projectDetails.projectDepartment =[projectDetails.projectDepartment];
    projectDetails.projectLab = [projectDetails.projectLab];
    projectDetails.createdAt = getCreatedDate(projectDetails.createdAt, projectDetails.isOldProject);
    this.service.createNewProject(projectDetails).subscribe( response =>{
      this.clearMessage();
      this.project.reset();
      this.router.navigate([`/project/${response.projectId}/edit`]);
      this.team=[this.userIdName];
    },error=>{
      this.clearMessage();
      this.errorMessage = error;
    })
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }

}
