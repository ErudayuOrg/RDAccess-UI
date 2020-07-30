import { Component,  Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';

import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-fp-investigator-card',
  templateUrl: './fp-investigator-card.component.html',
  styleUrls: ['./fp-investigator-card.component.css']
})
export class FpInvestigatorCardComponent implements OnChanges {
  @Input() investigator:any; 
  @Input() coInvestigators:any;   
  @Input() isEditMode:any; 
  coInvestigatorForm: FormGroup;
  constructor(private fb: FormBuilder, private service: ApiClientService) { }

  ngOnChanges(): void {
    this.coInvestigatorForm = this.fb.group({
      newCoInvestigator:[""],
      coInvestigatorSearchList : this.fb.array([]),
      newlyAddedCoInvestigators: this.fb.array([])
    });
  }

  get coInvestigatorSearchList(){
    return <FormArray>this.coInvestigatorForm.get('coInvestigatorSearchList');
  }

  get newlyAddedCoInvestigators(){
    return <FormArray>this.coInvestigatorForm.get('newlyAddedCoInvestigators');
  }

  clearCoInvestigatorSearchList(){
    while ( this.coInvestigatorSearchList.length !== 0) {
      this.coInvestigatorSearchList.removeAt(0)
    }
  }

  setCoInvestigatorList(userIds){
    userIds.forEach( id =>{
      if(![this.investigator,...this.coInvestigators, ...this.newlyAddedCoInvestigators.value].includes(id)){
        this.coInvestigatorSearchList.push(this.fb.control(id))
      }
    });
  }

  getMatchingIds(){
    const {newCoInvestigator} = this.coInvestigatorForm.value;
    this.clearCoInvestigatorSearchList();
    if( newCoInvestigator.length > 2){
      this.service.getMatchingUserId(newCoInvestigator)
        .subscribe( userIds => { this.setCoInvestigatorList(userIds) });
    }
  }

  addNewCoInvestigator(index){
    let newCoInvestigator = this.coInvestigatorSearchList.value[index];
    this.newlyAddedCoInvestigators.push(this.fb.control(newCoInvestigator));
    this.coInvestigatorForm.get("newCoInvestigator").reset();
    this.clearCoInvestigatorSearchList();
  }

  deleteNewcoInvestigator(index){
    this.newlyAddedCoInvestigators.removeAt(index);
  }

  getFormData(){
    this.coInvestigators = this.coInvestigators ?this.coInvestigators:[];
    const {newlyAddedCoInvestigators} = this.coInvestigatorForm.value;
    return { investigator :this.investigator, coInvestigator:[...this.coInvestigators ,...newlyAddedCoInvestigators]};
  }

}
