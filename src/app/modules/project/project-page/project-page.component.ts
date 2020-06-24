import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ApiClientService } from './../../../service/api-client.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project:any;
  user:string;
  badge:string;
  canEdit:boolean = true;
  editMode:boolean = false;
  hideEditButton:boolean;
  projectDetail = new FormGroup({
    projectTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    projectSummary: new FormControl('',[Validators.required, Validators.minLength(10)]),
    searchedContributorId: new FormControl(''),
    newReferanceLink: new FormControl('sdsd'),
    newKeyword: new FormControl('dsds'),
    status:new FormControl('')
  });

  team:any = [];
  referenceLink:any = [];
  keywords:any = [];
  contributorIds:any = [];
  
  constructor( private activatedRoute: ActivatedRoute, private service: ApiClientService) { }

  ngOnInit(): void {
    this.hideEditButton = (!this.canEdit && this.editMode);
    this.activatedRoute.params.subscribe((params) => {
      this.service.getProjectById(params.projectId).subscribe(project => {
        this.project = project;
        this.projectDetail.patchValue({
          projectTitle: project.projectTitle,
          projectSummary: project.projectSummary,
          status: project.status
        });
        this.referenceLink = project.referenceLink;
        this.keywords = project.keywords;

        this.badge = this.project.status == 'Completed'?"badge-success":"badge-warning";
      })
    })
  }
  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }

  removeReferenceFromProject(reference){
    this.referenceLink = this.referenceLink.filter(ref => ref != reference)
  }
  addReferenceToProject(reference){
    if(reference != ""){
      this.referenceLink.push(reference);
      this.projectDetail.value.newReferanceLink="";
    }
  }

  removeKeywordFromProject(keyword){
    this.keywords = this.keywords.filter(word => word != keyword)
  }
  addKeywordToProject(keyword){
    if(keyword != ""){
      this.keywords.push(keyword);
      this.projectDetail.value.newKeyword="";
    }
  }
  
  searchContributorIds(searchId){
    if( this.contributorIds.length === 0 || searchId !== this.contributorIds[0]){
      this.service.getMatchingUserId(searchId).subscribe(userIds=>{
        this.contributorIds = userIds;
      })
    } 
  }

  addContributorToTeam(contributorId){
    if(!this.project.team.includes(contributorId) && !this.team.includes(contributorId) && contributorId != "" && this.team.length < 5){
      this.team.push(contributorId);
      this.projectDetail.value.searchedContributorId="";
    }
  }

  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  onEditMode(){
    this.hideEditButton = true;
    this.editMode = true;
  }

  updateProject(){
    const {projectTitle, projectSummary, status} = this.projectDetail.value;
    let updatedProject ={
      projectTitle,
      projectSummary,
      status,
      team:[...this.project.team, ...this.team],
      referenceLink:this.referenceLink,
      keywords:this.keywords
    }
    console.log(updatedProject);
    this.editMode = false;
    this.hideEditButton = (!this.canEdit && this.editMode);
  }

  cancelUpdate(){
    this.editMode = false;
    this.hideEditButton = (!this.canEdit && this.editMode);
  }
}
