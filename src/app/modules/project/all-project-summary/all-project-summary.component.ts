import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';

import { RD_CONSTANT } from './../../../keys/constant';

@Component({
  selector: 'app-all-project-summary',
  templateUrl: './all-project-summary.component.html',
  styleUrls: ['./all-project-summary.component.css']
})
export class AllProjectSummaryComponent implements OnInit {
  projects:any;
  user:any;
  constructor(
    private service: ApiClientService
  ) { }

  ngOnInit(): void {
    this.service.getAllProjectsSummary().subscribe( projectsSummary =>{
      console.log(projectsSummary);
      this.projects = projectsSummary.map( project =>{
        let {status,...other} = project;
        status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
        return { status, ...other};
      });
    })
  }

  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }

}
