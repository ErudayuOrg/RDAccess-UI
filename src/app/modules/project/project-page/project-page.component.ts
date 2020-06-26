import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';

import {getEditAccess}  from "../../../utils/project.utils";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project:any;
  user:string;
  userId:string;
  badge:string;
  canEdit:boolean;
  editMode:boolean;
  successMessage:string;
  errorMessage:string;

  projectDetailForm = new FormGroup({
    projectTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    projectSummary: new FormControl('',[Validators.required, Validators.minLength(10)]),
    status:new FormControl(''),
    searchedContributorId: new FormControl(''),
    newReferanceLink: new FormControl(''),
    newKeyword: new FormControl(''),
    commitMessage: new FormControl('',[Validators.required, Validators.minLength(8)])
  });

  team:any;
  contributorIds:any;
  referenceLink:any = [];
  keywords:any = [];
  
  constructor( private activatedRoute: ActivatedRoute, 
    private service: ApiClientService, 
    private router:Router,
    private globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    this.editMode = false;
    this.userId = localStorage.getItem('USERID');
    this.activatedRoute.params.subscribe((params) => {
      this.service.getProjectById(params.projectId).subscribe(project => {
        this.setViewContent(project);
        this.canEdit = getEditAccess(this.globalStore.getGlobalStore(), project);
      },error=>{
        this.router.navigate(['/home']);
      })
    })
  }

  setViewContent(project){
    console.log(project);
    this.project = project;
    this.projectDetailForm.patchValue({
      projectTitle: project.projectTitle,
      projectSummary: project.projectSummary,
      status: project.status,
      newReferanceLink:"",
      newKeyword:"",
      searchedContributorId:"",
      commitMessage:""
    });
    this.referenceLink = project.referenceLink;
    this.keywords = project.keywords;
    this.badge = project.status === 'Completed' ? 'badge-success' : 'badge-warning';
    this.team = [];
    this.contributorIds = [];
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
      this.referenceLink = [...this.referenceLink ,reference];
      this.projectDetailForm.patchValue({newReferanceLink:""});
    }
  }

  removeKeywordFromProject(keyword){
    this.keywords = this.keywords.filter(word => word != keyword)
  }
  addKeywordToProject(keyword){
    if(keyword != ""){
      this.keywords = [...this.keywords ,keyword];
      this.projectDetailForm.patchValue({newKeyword:""});
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
      this.projectDetailForm.patchValue({searchedContributorId:""});
    }
  }

  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  onEditMode(){
    this.editMode = true;
  }

  updateProjectWithCommit(){
    const {projectTitle, projectSummary, status, commitMessage} = this.projectDetailForm.value;
    let updatedProject ={
      projectTitle,
      projectSummary,
      status,
      team:[...this.project.team, ...this.team],
      referenceLink:this.referenceLink,
      keywords:this.keywords,
      history:{commitMessage, userId:this.userId}
    }
    this.service.updateProject(updatedProject,this.project.projectId ).subscribe( updatedProject =>{
      this.clearErrorMessage();
      this.setViewContent(updatedProject.response);
      this.successMessage = updatedProject.message;
      this.editMode = false;
    },error =>{
      this.clearSuccessMessage();
      this.errorMessage = error;
    })
    
  }

  cancelUpdate(){
    this.setViewContent(this.project);
    this.editMode = false;
  }
  clearErrorMessage(){
    this.errorMessage = "";
  }
  clearSuccessMessage(){
    this.successMessage = "";
  }
}
