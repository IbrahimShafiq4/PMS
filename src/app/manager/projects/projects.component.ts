import { Component, HostListener, OnInit } from '@angular/core';
import { IProjectList, IProjectParamsRequest } from './models/projects';
import { ProjectsService } from './services/projects.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DeletePopUpComponent } from 'src/app/shared/components/delete-pop-up/delete-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  searchValue: string = '';
  tableHeaders: string[] = [
    'Title',
    'Description',
    'Task',
    'Creation date',
    'Modification date',
    'Actions',
  ];

  projectTableData: IProjectList = {
    data: [],
    pageNumber: 0,
    pageSize: 5,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  toggleViewControls: boolean = false;

  disableTableButton: boolean = false;

  constructor(
    private _ProjectsService: ProjectsService,
    private _toastrService: ToastrService,
    private _Router: Router,
    public _dialog: MatDialog,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    let requestParams: IProjectParamsRequest = {
      title: this.searchValue,
      pageNumber: this.projectTableData.pageNumber,
      pageSize: this.projectTableData.pageSize,
    };

    this._ProjectsService.getAllProjects(requestParams).subscribe({
      next: (res) => {
        this.projectTableData = res;
      },
      error: (error: HttpErrorResponse) =>
        this._toastrService.error(error.error.message, 'Error'),
      complete: () => {},
    });
  }

  getSearchVal(event: string) {
    this.searchValue = event;
    this.getProject();
  }

  willBeEdited(event: number) {
    this._Router.navigate([`/dashboard/manager/projects/edit/${event}`]);
  }

  pageSize(event: number) {
    // Ensure it accepts number
    this.projectTableData.pageSize = event;
    this.getProject();
  }

  pageNumber(event: number) {
    // Ensure it accepts number
    this.projectTableData.pageNumber = event;
    this.getProject();
  }

  willBeDeleted(event: number) {
    console.log(event);
    const dialogRef = this._dialog.open(DeletePopUpComponent, {
      data: { itemId: event },
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
      if (result) {
        this.onDeleteItem(result);
      }
    });
    // this._Router.navigate([`/dashboard/delete/${event}/projects`]);
  }

  onDeleteItem(id: number) {
    this._ProjectsService.deleteProject(id).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (errRes: HttpErrorResponse) => {
        this._ToastrService.error(errRes.error.message, 'Error');
      },
      complete: () => {
        this._ToastrService.success('Item has been deleted', 'Success');
        this.getProject();
      },
    });
  }

  willBeViewed(event: number) {
    this._Router.navigate([`/dashboard/manager/projects/view/${event}/projects`]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    if (window.innerWidth <= 991) {
      this.toggleViewControls = true;
      this.disableTableButton = true;
    } else {
      this.disableTableButton = false;
    }
  }
}
