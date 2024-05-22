import { IToglleResponse } from './../../../manager/users/models/users';
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
    private _ProjectsService: ProjectsService,
    private _ToastrService: ToastrService,
    private _TasksService: TasksService,
    private _UsersService: UsersService

  ) { }

  viewedItemDetails!: IProjectData;

  viewTaskDetails!: ITask

 

  itemId: number = 0;
  navigatedFrom: string = '';
  backTo: string = '';

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      console.log(params);

      this.itemId = +params['id'];
      this.navigatedFrom = params['navigatedFrom'];
    });

    if (this.itemId && this.navigatedFrom == 'projects') {
      this.getSingleProject(this.itemId);
    } else if (this.itemId && this.navigatedFrom == 'tasks') {
      this.getSingleTasks(this.itemId);
    }

    if (this.navigatedFrom == 'projects') {
      this.backTo = '/dashboard/manager/projects';
    }
  }

  getSingleProject(projectId: number) {
    this._ProjectsService.getSingleProject(projectId).subscribe({
      next: (res) => (this.viewedItemDetails = res),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => this._ToastrService.success('Project details has been Retrieved', 'Success')
    });
  }

  getSingleTasks(taskId: number) {
    this._TasksService.getSingleTask(taskId).subscribe({
      next: (res) => (this.viewTaskDetails = res),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => this._ToastrService.success('Project details has been Retrieved', 'Success')
    });
  }


}
