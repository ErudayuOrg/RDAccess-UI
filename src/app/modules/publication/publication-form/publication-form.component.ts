import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GlobalStoreService } from '../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  
  publicationForm: FormGroup;
  successMessage:string;
  errorMessage:string;
  userIdName:string;
  constructor(private fb: FormBuilder, private globalStore :GlobalStoreService, private service:ApiClientService) { }

  ngOnInit(): void {
    const {userId,userName} = this.globalStore.getGlobalStore();
    this.userIdName = `${userId}-${userName}`;
    this.publicationForm = this.fb.group({
      publicationType: ['', Validators.required], 
      publicationName: ['', Validators.required], 
      paperTitle: ['', Validators.required],
      publisherId: [this.userIdName, Validators.required],
      volumeNumber: ['', Validators.required],
      yearOfPublication:['', Validators.required],
      ISSN:['', Validators.required],
      indexing:['', Validators.required],
      role:['', Validators.required],
      pagesFrom:['', Validators.required],
      pagesTo:['', Validators.required],
      ISBN:['', Validators.required],
      contributionAs:['', Validators.required],
      issueNumber:['', Validators.required],
      impactFactor:['', Validators.required],
      editionNumber:['', Validators.required],
      DOIorURL:['', Validators.required]
    });
  }

  clearMessage(){
    this.successMessage = "";
    this.errorMessage = "";
  }

  addPublication(){
    const publicationDetails =  this.publicationForm.value;
    publicationDetails.publisherId =  publicationDetails.publisherId.split('-')[0];
    this.service.createNewPublication(publicationDetails).subscribe( response=>{
      this.clearMessage();
      this.successMessage = response.message;
      this.publicationForm.reset();
      this.publicationForm.patchValue({publisherId:this.userIdName});
    }, error=>{
      this.clearMessage();
      this.errorMessage = error;
    })
  }

}
