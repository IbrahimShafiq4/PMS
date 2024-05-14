import { Component, OnInit } from '@angular/core';
import { IProjectList, IProjectParamsRequest } from './models/projects';
import { ProjectsService } from './services/projects.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  tableHeaders: string[] = [
    'Title',
    'Description',
    'Task',
    'Creation Date',
    'Modification Date',
    'Actions',
  ];

  projectTableData: IProjectList = {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  constructor(
    private _ProjectsService: ProjectsService,
    private _toastrService: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    let requestParams: IProjectParamsRequest = {
      title: '',
      pageNumber: 1,
      pageSize: 10,
    };

    this._ProjectsService.getAllProjects(requestParams).subscribe({
      next: (res) => {
        this.projectTableData = res;
      },
      error: (error: HttpErrorResponse) =>
        this._toastrService.error(error.error.message, 'Error'),
      complete: () =>
        this._toastrService.success(
          'Data Has been Retrieved Successfully',
          'Success'
        ),
    });
  }

  willBeEdited(event: number) {
    this._Router.navigate([`/dashboard/manager/projects/edit/${event}`]);
  }
}
