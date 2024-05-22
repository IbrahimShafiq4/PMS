import { IUsersResponse } from './../../../manager/users/models/users';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IProjectList } from 'src/app/manager/projects/models/projects';
import { ITaskListResponse } from 'src/app/manager/tasks/models/tasks';


@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent {

  @Input() tableHeaders: string[] = [];
  @Input() tableDefinitionText: string = '';
  @Input() tableBodyContentOfProjects?: IProjectList;
  @Input() tableBodyContentOfTasks?: ITaskListResponse;
  @Input() tableBodyContentOfUsers?: IUsersResponse;
  @Input() tableBodyEmployeeProject?: IProjectList;
  @Output() pageSizeChanged = new EventEmitter<number>();
  @Output() pageIndexChanged = new EventEmitter<number>();
  @Output() editCategory = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() block = new EventEmitter<number>();

  pageSize = 5;
  pageIndex = 1;

  get totalRecords(): number {
    return (
      this.tableBodyContentOfProjects?.totalNumberOfRecords ||
      this.tableBodyContentOfTasks?.totalNumberOfRecords ||
      this.tableBodyContentOfUsers?.totalNumberOfRecords ||
      this.tableBodyEmployeeProject?.totalNumberOfPages ||
      0
    );
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSizeChanged.emit(this.pageSize);
    this.pageIndexChanged.emit(this.pageIndex);
  }
}
