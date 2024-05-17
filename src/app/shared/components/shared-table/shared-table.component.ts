import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IProjectList } from 'src/app/manager/projects/models/projects';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent {

  @Output() pageSize: any = new EventEmitter<number | null>();
  @Output() pageNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndex = 0;
  @Input() tableHeaders: string[] = [];
  @Input() tableDefinitionText: string = '';
  @Input() tableBodyContent!: IProjectList;
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() editItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  data: string = '';

  inputFilter() {
    this.searchValue.emit(this.data);
  }

  isEdited(rowId: number) {
    this.editItem.emit(rowId);
  }

  handlePageEvent(e: any) {
    this.pageSize.emit(e.pageSize);
    this.pageNumber.emit(e.pageIndex);
  }
}
