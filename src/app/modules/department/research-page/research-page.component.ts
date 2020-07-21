import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';

import { RD_CONSTANT } from './../../../keys/constant';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css'],
})
export class ResearchPageComponent implements OnInit {
  research: any;
  department: any;
  projects: any;
  user:any;
  labSnapshot:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.service.getDepartments().subscribe(departments => {
        this.department = departments.filter(dept => dept.departmentId === params.departmentId)[0];
        this.research = this.department.researchLab.filter(research => research.researchLabId === params.researchId)[0];
        this.service.getProjectsByLabId(params.researchId).subscribe( projects =>{
          this.projects = projects;
        })
      });
    });
    this.labSnapshot = [{
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.FUNDINGS,
      tileCount:'20+'
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PROJECTS,
      tileCount:'100+'
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PUBLICATIONS,
      tileCount:'50+'
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.MOUS,
      tileCount:'10+'
    }
  ]
  }

  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }

}
