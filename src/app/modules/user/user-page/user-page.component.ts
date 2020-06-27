import { Component, OnInit } from '@angular/core';

import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  projects:any;
  userId:string;
  userName : string;
  departmentId:string;
  designation:string;

  constructor(private service:ApiClientService, private globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    const {userId,userDepartmentId,userName,userDesignation} = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.userName = userName;
    this.departmentId = userDepartmentId;
    this.designation = userDesignation;

    this.service.getProjectByUserId(this.userId).subscribe(projects =>{
      let allProjects = projects.map(
          project => ({"projectId" : project.projectId, 
                      "projectTitle" :project.projectTitle,
                      "status" :project.status,
                      "createdAt": project.createdAt
                    })
      );
      this.projects = allProjects;
    })
  }

}

