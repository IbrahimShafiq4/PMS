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
  @Output() searchValueEntered: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCategory: EventEmitter<number> = new EventEmitter();
  @Output() view: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  searchValue:string=''

  ngOnInit(): void {}

  isEdited(rowData: any) {
    this.editCategory.emit(rowData);
  }

  handlePageEvent(e: any) {
    this.pageSize.emit(e.pageSize);
    this.pageNumber.emit(e.pageIndex);
  }

  sendSearchValue() {
    this.searchValueEntered.emit(this.searchValue);
  }

  viewItem(rowId: number) {
    this.view.emit(rowId);
  }

  deleteItem(rowId: number) {
    this.delete.emit(rowId)
  }
}
