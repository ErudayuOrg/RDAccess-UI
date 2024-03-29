import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';

import { RD_CONSTANT } from './../../../keys/constant';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent implements OnInit{
  tempImgUrl = "https://img.favpng.com/20/20/1/market-research-marketing-competitor-analysis-quantitative-research-png-favpng-mamGg6Nes0HgSV8YUQJpTXSFh.jpg"
  department:any;
  researches:any;
  departmentSnapshot: any;

  constructor(private activatedRoute: ActivatedRoute, private service:ApiClientService){
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params =>{
      this.service.getDepartments().subscribe( departments =>{
        this.department = departments.filter( dept => dept.departmentId === params.departmentId)[0];
        this.researches = this.department.researchLab;
      })
    })
    this.departmentSnapshot = [{
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.FUNDINGS,
      tileCount:'10+'
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PROJECTS,
      tileCount:'50+'
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PUBLICATIONS,
      tileCount:'25+'
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.MOUS,
      tileCount:'5+'
    }
  ]
  }

}
