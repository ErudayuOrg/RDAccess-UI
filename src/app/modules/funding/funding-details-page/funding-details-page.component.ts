import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {RD_CONSTANT} from '../../../keys/constant';

import { ApiClientService } from '../../../service/api-client.service';
import { GlobalStoreService } from '../../../service/global-store.service';

import {getFundingEditAccess, isPastDate}  from "../../../utils/funding.utils";
import {validateAndUpdate}  from "../../../utils/project.utils";

@Component({
  selector: 'app-funding-details-page',
  templateUrl: './funding-details-page.component.html',
  styleUrls: ['./funding-details-page.component.css']
})
export class FundingDetailsPageComponent implements OnInit {
  @ViewChild('descriptionTileRef') descriptionTileRef;
  @ViewChild('additionalDetailsTileRef') additionalDetailsTileRef;
  @ViewChild('headerSectionTileRef') headerSectionTileRef;
  @ViewChild('fundingUrlsCardRef') fundingUrlsCardRef;
  
  userId:string;

  canEdit:boolean;
  editMode:boolean;
  successMessage:string;
  errorMessage:string;
  isloading:boolean;
  
  funding:any
  nameOfGrant:String;
  fundingOrganisation:String;
  deadline:Date;
  descriptionOfScheme:String;
  additionalDetails:any;
  fundingUrls:any;
  status:String;
  badge:String

  isAnyformInvalid:boolean = false;
  formValidityArray = Array(RD_CONSTANT.FUNDING_TILE_INDEX.TOTAL_SIZE).fill(false); 
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const { userId } = this.globalStore.getGlobalStore()
    this.userId = userId;
    this.editMode = false;
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getfundingDetailsById(params.fundingId).subscribe(funding => {
          this.setViewContent(funding);
          this.canEdit = getFundingEditAccess(this.globalStore.getGlobalStore());
          this.funding = funding;
          this.isloading = false;
        })
      })
    }
    
  setViewContent(funding){
    this.funding = funding;
    this.descriptionOfScheme = funding.descriptionOfScheme;
    this.additionalDetails = funding.additionalDetails;
    this.nameOfGrant= funding.nameOfGrant;
    this.fundingOrganisation= funding.fundingOrganisation;
    this.deadline = funding.deadline;
    this.fundingUrls = funding.fundingUrls;
    this.status = isPastDate(this.deadline)? "Closed":"Live";
    this.badge = isPastDate(this.deadline)? "danger":"success";
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
  
  updateWithCommit({commitMessage}){

    const history = {commitMessage, userId:this.userId};
    const header = this.headerSectionTileRef.getFormData();
    let updatedFunding = {
      nameOfGrant:validateAndUpdate(header.nameOfGrant, this.nameOfGrant ),
      fundingOrganisation:validateAndUpdate(header.fundingOrganisation, this.fundingOrganisation ),
      deadline: validateAndUpdate(header.deadline, this.deadline ),
      descriptionOfScheme: validateAndUpdate(this.descriptionTileRef.getFormData(), this.descriptionOfScheme ),
      additionalDetails: validateAndUpdate(this.additionalDetailsTileRef.getFormData(), this.additionalDetails ), 
      fundingUrls:validateAndUpdate(this.fundingUrlsCardRef.getFormData(), this.fundingUrls ),
      history
    };

    this.service.updateFunding(updatedFunding,this.funding.fundingId )
    .subscribe( updatedFunding =>{
      this.clearMessages();
      this.editMode = false;
      this.setViewContent(updatedFunding.response);
      this.successMessage = updatedFunding.message;
      console.log(updatedFunding);
      },error =>{
        this.clearMessages();
       this.errorMessage = error;
    })
  }

}
