import { Component, OnInit } from '@angular/core';

import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-all-publication-summary',
  templateUrl: './all-publication-summary.component.html',
  styleUrls: ['./all-publication-summary.component.css']
})
export class AllPublicationSummaryComponent implements OnInit {
  publications:any;
  constructor(
    private service: ApiClientService
  ) { }

  ngOnInit(): void {
    this.service.getAllPublicationsSummary().subscribe( publicationsSummary =>{
      console.log(publicationsSummary);
      this.publications = publicationsSummary;
    })
  }

}
