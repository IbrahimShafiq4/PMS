import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProjectList } from 'src/app/manager/projects/models/projects';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent {
  @Input() tableHeaders: string[] = [];
  @Input() tableDefinitionText: string = '';
  @Input() tableBodyContent!: IProjectList;

  @Output() editCategory: EventEmitter<number> = new EventEmitter();

  isEdited(rowData: any) {
    this.editCategory.emit(rowData);
  }
}
