import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';

import { RD_CONSTANT } from './../../../keys/constant';

import {getEditAccess,validateAndUpdate,filterIdfromTeam}  from "../../../utils/project.utils";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnChanges {

  @ViewChild('titleTileRef') titleTileRef;
  @ViewChild('summaryTileRef') summaryTileRef;
  @ViewChild('keywordsTileRef') keywordsTileRef;
  @ViewChild('referenceLinkTileRef') referenceLinkTileRef;
  @ViewChild('contentTileRef') contentTileRef;
  @ViewChild('statusCardRef') statusCardRef;
  @ViewChild('contributorsCardRef') contributorsCardRef;
  

  userId:string;
  
  canEdit:boolean;
  editMode:boolean;
  successMessage:string;
  errorMessage:string;
  isloading: boolean;
  
  project:any;
  projectTitle: string;
  projectContent: any = [];
  projectSummary: string;
  referenceLink: any = [];
  keywords:any = [];
  status: string;
  contributors:any = [];
  history:any;

  isAnyformInvalid:boolean = false;
  formValidityArray = Array(RD_CONSTANT.PROJECT_TILE_INDEX.TOTAL_SIZE).fill(false); 

  constructor( private activatedRoute: ActivatedRoute, 
    private service: ApiClientService, 
    private router:Router,
    private globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    const { userId } = this.globalStore.getGlobalStore()
    this.editMode = false;
    this.userId = userId;
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getProjectById(params.projectId).subscribe(project => {
        this.setViewContent(project);
        this.canEdit = getEditAccess(this.globalStore.getGlobalStore(), project);
        this.isloading = false;
      },error=>{
        this.router.navigate(['/home']);
      })
    })
  }

  ngOnChanges(){
  
  }
  setViewContent(project){
    this.project = project;
    this.history = project.history;
    this.projectTitle = project.projectTitle;
    this.projectSummary = project.projectSummary;
    this.keywords = project.keywords;
    this.referenceLink = project.referenceLink;
    this.projectContent = project.projectContent;
    this.status = project.status;
    this.contributors = project.team;
  }

  onEditMode(){
    this.editMode = true;
  }

  cancelUpdate(){
    this.editMode = false;
  }

  clearMessages(){
    this.errorMessage = "";
    this.successMessage = "";
  }
  
  checkAllFormValidity(event){
    this.formValidityArray[event.index] = event.value;
    this.isAnyformInvalid = this.formValidityArray.includes(true);
  }

  updateProjectWithCommit({commitMessage}){
    const history = {commitMessage, userId:this.userId}
    this.projectTitle = validateAndUpdate(this.titleTileRef.getFormData(), this.projectTitle );
    this.projectSummary = validateAndUpdate(this.summaryTileRef.getFormData(), this.projectSummary );
    this.keywords = validateAndUpdate(this.keywordsTileRef.getFormData(), this.keywords);
    this.referenceLink = validateAndUpdate(this.referenceLinkTileRef.getFormData(), this.referenceLink);
    this.projectContent = validateAndUpdate(this.contentTileRef.getFormData(), this.projectContent );
   
    this.status = validateAndUpdate(this.statusCardRef.getFormData(), this.status );
    this.contributors = validateAndUpdate(this.contributorsCardRef.getFormData(), this.contributors );
    
    let updatedProject = {
      projectTitle: this.projectTitle,
      projectSummary: this.projectSummary ,
      keywords:this.keywords,
      referenceLink:this.referenceLink,
      projectContent: this.projectContent,
      status: this.status,
      team: filterIdfromTeam(this.contributors),
      history
    };
    
    this.service.updateProject(updatedProject,this.project.projectId )
      .subscribe( updatedProject =>{
        this.clearMessages();
        this.setViewContent(updatedProject.response);
        this.successMessage = updatedProject.message;
        this.editMode = false;
      },error =>{
        this.clearMessages();
       this.errorMessage = error;
    })
  }
}
