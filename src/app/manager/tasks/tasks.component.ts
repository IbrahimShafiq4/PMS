import { Component } from '@angular/core';
import { ITaskListResponse, ITasksParameters } from './models/tasks';
import { Router } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  searchValue: string = '';
  tableHeaders: string[] = [
    'Title',
    'Status',
    'User',
    'Projects',
    'Creation Date',
    'Actions',
  ];
  taskTableData: ITaskListResponse = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  constructor(
    private _Router: Router,
    private _TasksService: TasksService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    let requestParam: ITasksParameters = {
      title: this.searchValue,
      status: '',
      pageSize: this.taskTableData.pageSize,
      pageNumber: this.taskTableData.pageNumber,
    };
    this._TasksService.getAllMyTasksForManager(requestParam).subscribe({
      next: (res) => {
        this.taskTableData = res;
      },
      error: (err: HttpErrorResponse) => {
        this._toastrService.error(err.error.message, 'Error');
      },
      complete: () => {},
    });
  }

  getSearchVal(event: string) {
    this.searchValue = event;
    this.getTasks();
  }

  willBeEdited(event: number) {
    this._Router.navigateByUrl(`dashboard/manager/tasks/edit/${event}`);
  }

  pageNumber(event: number) {
    this.taskTableData.pageNumber = event;
    this.getTasks();
  }
  pageSize(event: number) {
    this.taskTableData.pageSize = event;
    this.getTasks();
  }
}
