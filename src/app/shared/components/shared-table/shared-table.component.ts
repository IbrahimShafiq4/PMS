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

  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndexChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() tableHeaders: string[] = [];
  @Input() tableDefinitionText: string = '';
  @Input() tableBodyContent!: IProjectList | ITaskListResponse;
  @Output() searchValueEntered: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCategory: EventEmitter<number> = new EventEmitter<number>();
  @Output() view: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  searchValue: string = '';
  pageSize: number = 5; // Default page size
  pageIndex: number = 0; // Default page index

  ngOnInit(): void {
    console.log(this.tableBodyContent.data);
  }

  isEdited(rowData: any) {
    this.editCategory.emit(rowData);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageSizeChanged.emit(this.pageSize);
    this.pageIndexChanged.emit(this.pageIndex);
  }

  sendSearchValue() {
    this.searchValueEntered.emit(this.searchValue);
  }

  isProject(content: any): content is IProjectList {
    return content && Array.isArray(content.data) && content.data.length > 0 && 'task' in content.data[0];
  }

  isTask(content: any): content is ITaskListResponse {
    return content && Array.isArray(content.data) && content.data.length > 0 && 'status' in content.data[0];
  }

  viewItem(rowId: number) {
    this.view.emit(rowId);
  }

  deleteItem(rowId: number) {
  this.delete.emit(rowId);
    console.log(rowId);

  }
}
