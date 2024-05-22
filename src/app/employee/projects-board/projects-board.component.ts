import { IProjectList } from 'src/app/manager/projects/models/projects';
import { IGetAllProjectsRequest  } from './../models/projects-board';
import { Component ,OnInit} from '@angular/core';
import { ProjectsBoardService } from '../services/projects-board.service';


@Component({
  selector: 'app-projects-board',
  templateUrl: './projects-board.component.html',
  styleUrls: ['./projects-board.component.scss']
})
export class ProjectsBoardComponent implements OnInit {
  searchValue: string = '';
  projectsRequest:IGetAllProjectsRequest={
    title:this.searchValue,
    pageNumber:1,
    pageSize:10,
  }
  tableHeaders: string[] = [
    'Title',
    'Description',
    'Number of Tasks',
    'Creation Date',
    'Modification Date',
  ];

  projectTableData: IProjectList = {
    data: [],
    pageNumber: 0,
    pageSize: 5,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  constructor(private _ProjectsBoardService:ProjectsBoardService){ }
  ngOnInit() {
    this.getAllProjects();
  }


  // get all projects for employee
  getAllProjects(){
    this._ProjectsBoardService.getAllEmplyeeProjects(this.projectsRequest).subscribe({
      next:(res)=>{
        console.log(res);
        this.projectTableData=res;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  pageSize(event: number) { // Ensure it accepts number
    this.projectTableData.pageSize = event;
    this.getAllProjects();
  }

  pageNumber(event: number) { // Ensure it accepts number
    this.projectTableData.pageNumber = event;
    this.getAllProjects();
  }

  getSearchVal(event: string) {
    this.searchValue = event;
    this.getAllProjects();
  }

}
