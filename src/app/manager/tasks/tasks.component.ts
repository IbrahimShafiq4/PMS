import { Component, HostListener } from '@angular/core';
import { ITaskListResponse, ITasksParameters } from './models/tasks';
import { Router } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { DeletePopUpComponent } from 'src/app/shared/components/delete-pop-up/delete-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  searchValue: string = '';
  status:string=''
  tableHeaders: string[] = [
    'Title',
    'Status',
    'Description',
    'User',
    'Projects',
    'Creation date',
    'Actions',
  ];

  taskTableData: ITaskListResponse = {
    pageNumber: 0,
    pageSize: 0,
    data: [],
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  toggleViewControls: boolean = false;

  disableTableButton: boolean = false;
  noData:boolean=false
  constructor(
    private _Router: Router,
    private _TasksService: TasksService,
    private _toastrService: ToastrService,
    public _dialog: MatDialog,
    private _ToastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.checkBodyWidth()
  }

  getTasks() {
    let requestParam: ITasksParameters = {
      title: this.searchValue,
      status: this.status,
      pageSize: this.taskTableData.pageSize,
      pageNumber: this.taskTableData.pageNumber,
    };
    this._TasksService.getAllMyTasksForManager(requestParam).subscribe({
      next: (res) => {
        this.taskTableData = res;
        this.taskTableData.data.length==0?this.noData=true:this.noData=false
      },
      error: (err: HttpErrorResponse) => {
        this._toastrService.error(err.error.message, 'Error');
      },
      complete: () => {},
    });
  }

  // getSearchVal(event: string) {
  //   this.searchValue = event;
  //   this.getTasks();
  // }

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

  willBeDeleted(event: number) {
    const dialogRef = this._dialog.open(DeletePopUpComponent, {
      data:{itemId:event},
      height: 'auto',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDeleteItem(result)
      }
    });

  }

  onDeleteItem(id:number){
    this._TasksService.deleteSingleTask(id).subscribe({
      next: (res) => {
      },
      error: (errRes:HttpErrorResponse) => {

          this._ToastrService.error(errRes.error.message, 'Error')
      },
      complete:()=> {
        setTimeout(() => {
          this._ToastrService.success(
            'Item has been deleted',
            'Success'
          );
        }, 1500);

        this.getTasks();
      },
    });
  }

  willBeViewed(event: number) {
    this._Router.navigate([`/dashboard/manager/tasks/view/${event}/tasks`]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkBodyWidth()
  }

  private checkBodyWidth() {
    if (window.innerWidth <= 991) {
      this.toggleViewControls = true;
      this.disableTableButton = true;
    } else {
      this.disableTableButton = false;
    }
  }
}
