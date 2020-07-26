import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';

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
      this.projects = projectsSummary;
    })
  }

  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }

}
