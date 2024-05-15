import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IProjectList } from 'src/app/manager/projects/models/projects';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent {

  @Output() pageSize: any = new EventEmitter();
  @Output() pageNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageIndex = 0;
  @Input() tableHeaders: string[] = [];
  @Input() tableDefinitionText: string = '';
  @Input() tableBodyContent!: IProjectList;
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCategory: EventEmitter<number> = new EventEmitter();
  data: string = '';

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.searchValue.emit(this.data);
    console.log('searchValue', this.searchValue);
    console.log(this.data);
  }
  isEdited(rowData: any) {
    this.editCategory.emit(rowData);
  }

  handlePageEvent(e: any) {
    this.pageSize.emit(e.pageSize);
    this.pageNumber.emit(e.pageIndex);
  }
}
