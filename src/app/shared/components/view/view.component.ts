import {
  ISingleUser,
  IToglleResponse,
} from './../../../manager/users/models/users';
import { IProject, IUser } from './../../../manager/tasks/models/tasks';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProjectData } from 'src/app/manager/projects/models/projects';
import { ProjectsService } from 'src/app/manager/projects/services/projects.service';
import { ITask } from 'src/app/manager/tasks/models/tasks';
import { TasksService } from 'src/app/manager/tasks/services/tasks.service';
import { UsersService } from 'src/app/manager/users/services/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _UsersService: UsersService
  ) {}

  viewUserDetails: ISingleUser = {
    id: 0,
    userName: '',
    imagePath: '',
    email: '',
    country: '',
    phoneNumber: '',
    isActivated: false,
    creationDate: '',
    modificationDate: '',
  };

  toggleViewControls: boolean = false;

  disableTableButton: boolean = false;

  imagePort: string = 'https://upskilling-egypt.com:3003/';
  emptyUserSrc: string = '../../../../assets/images/projects.svg';

  itemId: number = 0;
  navigatedFrom: string = '';
  backTo: string = '';

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.itemId = +params['id'];
      this.navigatedFrom = params['navigatedFrom'];
    });

    if (this.itemId && this.navigatedFrom == 'users') {
      this.getSingleUsers(this.itemId);
    }

    if (this.navigatedFrom == 'users') {
      this.backTo = '/dashboard/manager/users';
    }
  }

  getSingleUsers(userId: number) {
    this._UsersService.getSingleUser(userId).subscribe({
      next: (res) => (this.viewUserDetails = res),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {  }
    });
  }

  toggleUserStatusActivatedOrNot(userId: number) {
    this._UsersService.toggleActivatedEmployee(userId, this.viewUserDetails).subscribe({
      next: (res) => { this.viewUserDetails = res },
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {  }
    });
  }
}
