import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.service.getDepartments().subscribe(departments => {
        this.department = departments.filter(dept => dept.departmentId === params.id)[0];
        this.research = this.department.researchLab.filter(research => research.researchLabId === params.researchId)[0];
        this.service.getProjectsByLabId(params.researchId).subscribe( projects =>{
          this.projects = projects;
        })
      });
    });
  }

  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }

}
