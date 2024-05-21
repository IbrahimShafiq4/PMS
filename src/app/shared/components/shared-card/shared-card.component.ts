import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProjectList } from 'src/app/manager/projects/models/projects';
import { ITaskListResponse } from 'src/app/manager/tasks/models/tasks';
import { IUsersResponse } from 'src/app/manager/users/models/users';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss']
})
export class SharedCardComponent {
  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() tableHeaders: string[] = [];
  @Input() tableDefinitionText: string = '';
  @Input() tableBodyContent!: IProjectList | ITaskListResponse | IUsersResponse;
  @Output() searchValueEntered: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterValueEnterd: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupValueEnterd: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchValueEnteredTasks: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupValueEnterdTasks: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCategory: EventEmitter<number> = new EventEmitter<number>();
  @Output() view: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() block: EventEmitter<number> = new EventEmitter<number>();

  searchValue: string = '';
  filterValue: string = '';
  searchValueTasks: string = '';
  roleIdsTasks: string = '';
  roleIds:string='';
  pageSize: number = 5; // Default page size
  pageIndex: number = 1; // Default page index

}