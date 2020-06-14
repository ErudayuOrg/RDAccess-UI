import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { RD,DEPARTMENTS } from './../../../keys/constant';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css']
})
export class ResearchPageComponent{
  research:any;
  department:any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params =>{
      this.research = RD[params.id].filter( research => research.id === params.researchId)[0];
      this.department = DEPARTMENTS.filter( dept => dept.id === params.id)[0];
    })
   }

}
