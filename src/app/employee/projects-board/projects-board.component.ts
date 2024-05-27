import { IProjectList } from 'src/app/manager/projects/models/projects';
import { IGetAllProjectsRequest  } from './../models/projects-board';
import { Component ,OnInit} from '@angular/core';
import { ProjectsBoardService } from '../services/projects-board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-projects-board',
  templateUrl: './projects-board.component.html',
  styleUrls: ['./projects-board.component.scss']
})
export class ProjectsBoardComponent implements OnInit {
  searchValue: string = '';
  noData:boolean=false;
  // projectsRequest:IGetAllProjectsRequest={
  //   title:this.searchValue,
  //   pageNumber:1,
  //   pageSize:10,
  // }
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

  constructor(private _ProjectsBoardService:ProjectsBoardService,private _toastrService:ToastrService){ }
  ngOnInit() {
    this.getAllProjects();
  }


  // get all projects for employee
  getAllProjects(){
    let requestParams: IGetAllProjectsRequest = {
      title: this.searchValue,
      pageNumber: this.projectTableData.pageNumber,
      pageSize: this.projectTableData.pageSize,
    };
    this._ProjectsBoardService.getAllEmplyeeProjects(requestParams).subscribe({
      next:(res)=>{
        this.projectTableData=res;
        this.projectTableData.data.length==0?this.noData=true:this.noData=false
      },error:(err:HttpErrorResponse)=>{
        this._toastrService.error(err.error.message, 'Error')
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

}
