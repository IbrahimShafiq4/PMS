import { IUsersResponse, IUsersParamsRequest } from './models/users';
import { Component, HostListener, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchValue: string = '';

  filterValue: string = '';
  roleIds: string = '';
  noData:boolean=false
  tableHeaders: string[] = [
    'User name',
    'Statues',
    'Phone number',
    'Email',
    'Actions',
  ];

  userTableData: IUsersResponse = {
    data: [],
    pageNumber: 0,
    pageSize: 5,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  isActivated: boolean = false;
  toggleViewControls: boolean = false;

  disableTableButton: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {

    if (window.innerWidth <= 991) {
      this.toggleViewControls = true;
      this.disableTableButton = true;
    } else {
      this.disableTableButton = false;
    }
  }


  userTableData: IUsersResponse = {
    data: [],
    pageNumber: 0,
    pageSize: 5,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  };

  isActivated: boolean = false;

  constructor(private _UsersService: UsersService,
    private _toastrService: ToastrService,
    private _Router: Router,
    public _dialog: MatDialog,
    private _ToastrService: ToastrService) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    let requestParams: IUsersParamsRequest = {
      [this.filterValue]: this.searchValue,
      groups:this.roleIds,
      pageNumber: this.userTableData.pageNumber,
      pageSize: this.userTableData.pageSize
    };
    this._UsersService.getAllUsers(requestParams).subscribe({
      next: (res) => {
        this.userTableData = res;
        this.userTableData.data.length==0?this.noData=true:this.noData=false
      },
      error: (error: HttpErrorResponse) => {
        this._toastrService.error(error.error.message, 'Error')
        // console.log(error)
      }, complete: () => { }
    })
  }


  pageSize(event: number) { // Ensure it accepts number
    this.userTableData.pageSize = event;
    this.getUsers();
  }

  pageNumber(event: number) { // Ensure it accepts number
    this.userTableData.pageNumber = event;
    this.getUsers();
  }

  // function for active and not active user
  onToggleitem(id: number) {
    this._UsersService.toggleActivatedEmployee(id, 'ww').subscribe({
      next: (res) => {
        console.log('res', res);
        this.isActivated = res.isActivated;
      },
      error: (errRes: HttpErrorResponse) => {

        this._ToastrService.error(errRes.error.message, 'Error')
      },
      complete: () => {
        if (this.isActivated == true) {
          this._ToastrService.success(
            'Acouunt Activated Successfuly',
            'Success'
          );
        } else if (this.isActivated == false) {
          this._ToastrService.success(
            'Acouunt Not Activated',
            'Success'
          );

        }

        this.getUsers();
      },
    });
  }


  willBeViewed(event: number) {
    this._Router.navigate([`/dashboard/view/${event}/users`]);
  }

}
