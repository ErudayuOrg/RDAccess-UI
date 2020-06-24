import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  projects:any;
  userName : string;
  userId:string;
  designation:string;
  departmentId:string;
  departments:any;
  researchLabs:any;
  team:any;
  user:string;
  contributorsId:any = [];
  successMessage:string = "";
  people:string;
  formSubmitError:string;
  modal:string;

  constructor(private service:ApiClientService) { }

  ngOnInit(): void {
     this.userId = localStorage.getItem('USERID');
     this.userName = localStorage.getItem('USERNAME');
    this.designation = localStorage.getItem('DESIGNATION');
    this.departmentId = localStorage.getItem('DEPARTMENTID');

    this.service.getProjectByUserId(this.userId).subscribe(projects =>{
      let allProjects = projects.map(
          project => ({"projectId" : project.projectId, 
                      "projectTitle" :project.projectTitle,
                      "status" :project.status,
                    })
      );
      this.projects = allProjects;
    })
  }

  getLabs(deptId){
    this.researchLabs= this.departments.filter(dept=> dept.departmentId === deptId)[0].researchLab;
  }

  removePeople(userId){
    this.team = this.team.filter(people => (people != userId || people==this.user));
  }
  getContributor(people){
    if( this.contributorsId.length === 0 || people !== this.contributorsId[0]){
      this.service.getMatchingUserId(people).subscribe(userIds=>{
        this.contributorsId = userIds;
      })
    }
  }

  addContributor(cont){
    if(!this.team.includes(cont))
      this.team.push(cont);
    this.people = "";
  }

  clearDataList(){
    this.contributorsId = [];
  }

  createProject({projectTitle,projectSummary,department,lab}){
    const projectDetails = {
      projectTitle,
      projectSummary,
      projectDepartment :department,
      projectLab:lab,
      team:this.team
    };
    console.log(projectDetails);
    if(projectTitle && projectSummary && department && lab){
      this.service.createNewProject(projectDetails).subscribe( response =>{
        this.successMessage = response.message;
        this.formSubmitError = "";
        this.modal="modal";
      })
    }
    else{
         this.modal=""
      this.formSubmitError = "Please fill all details"; 
    }
  }

}

