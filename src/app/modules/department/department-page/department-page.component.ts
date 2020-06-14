import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { DEPARTMENTS,RD } from './../../../keys/constant';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent{
  tempImgUrl = "https://img.favpng.com/20/20/1/market-research-marketing-competitor-analysis-quantitative-research-png-favpng-mamGg6Nes0HgSV8YUQJpTXSFh.jpg"
  department:any;
  researches:any;
  constructor(private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params =>{
      this.department = DEPARTMENTS.filter( dept=> dept.id === params.id)[0];
      this.researches = RD[this.department.id];
    })
  }
}
