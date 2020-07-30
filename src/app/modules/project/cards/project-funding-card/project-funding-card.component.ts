import { Component,  Input, OnInit } from '@angular/core';

import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-project-funding-card',
  templateUrl: './project-funding-card.component.html',
  styleUrls: ['./project-funding-card.component.css']
})
export class ProjectFundingCardComponent implements OnInit {
  @Input() fundingProjects:any;  

  constructor() { }

  ngOnInit(): void {
  }

}
