import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-all-funding-summary',
  templateUrl: './all-funding-summary.component.html',
  styleUrls: ['./all-funding-summary.component.css']
})
export class AllFundingSummaryComponent implements OnInit {
  fundings: any;
  fundingDetail:any;
  constructor(
    private service: ApiClientService
  ) { }

  ngOnInit(): void {
    this.service.getAllFundingsSummary().subscribe( fundingsSummary =>{
      this.fundings = fundingsSummary;
      console.log(this.fundings)
    })
  }
  getFundingDetail(index){
    this.fundingDetail = this.fundings[index];
    console.log(this.fundingDetail);
  }
  applyFunding(data){
    console.log(data);
  }
}
