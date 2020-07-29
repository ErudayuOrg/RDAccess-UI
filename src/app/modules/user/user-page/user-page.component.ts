import { Component, OnInit } from '@angular/core';

import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';
import {getCreateProjectAccess} from '../../../utils/project.utils';

import { RD_CONSTANT } from '../../../keys/constant'


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  projects:any;
  publications:any;
  fundingProjects:any;

  userId:string;
  userName : string;
  departmentId:string;
  designation:string;
  createAccess:boolean;
  
  notificatation: string;
  constructor(private service:ApiClientService, private globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    const {userId,userDepartmentId,userName,userDesignation,userDesignationCode} = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.userName = userName;
    this.departmentId = userDepartmentId;
    this.designation = userDesignation;

    this.service.getProjectByUserId(this.userId).subscribe(projects =>{
      let allProjects = projects.map(
          project => ({"projectId" : project.projectId, 
                      "projectTitle" :project.projectTitle,
                      "status" : RD_CONSTANT.PROJECT_STATUS_MAP[project.status],
                      "createdAt": project.createdAt
                    })
      );
      this.projects = allProjects;
    })

    this.service.getPublicationsByUserId(this.userId).subscribe(publications =>{
      let allPublications = publications.map(
        publication => ({"publicationId" : publication.publicationId, 
                      "publicationType" :publication.publicationType,
                      "publicationName" :publication.publicationName,
                      "paperTitle": publication.paperTitle,
                      "yearOfPublication": publication.yearOfPublication
                    })
      );
      this.publications = allPublications;
    })
    
    this.service.getFundingProjectByUserId(this.userId).subscribe(fundingProjects =>{
      let allFundingProjects = fundingProjects.map(
        fundingProject => ({"fundingProjectId" : fundingProject.fundingProjectId, 
                      "fundingType" :fundingProject.fundingType,
                      "status" :  RD_CONSTANT.FUNDING_STATUS_MAP[fundingProject.status],
                      "nameOfGrant": fundingProject.nameOfGrant,
                      "isReceivedFund": fundingProject.isReceivedFund
                    })
      );
      this.fundingProjects = allFundingProjects;
    })

    this.createAccess = getCreateProjectAccess(userDesignationCode);
  }

}

