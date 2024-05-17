import { ProjectsService } from './../../../projects/services/projects.service';
import { ITask } from './../../models/tasks';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, catchError, finalize, of, switchMap, tap } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IProjectData, IProjectList, IProjectParamsRequest } from 'src/app/manager/projects/models/projects';

@Component({
  selector: 'app-add-edit-tasks',
  templateUrl: './add-edit-tasks.component.html',
  styleUrls: ['./add-edit-tasks.component.scss'],
})
export class AddEditTasksComponent implements OnInit {
  addEditText: string = '';
  navigationLink: string = '/dashboard/manager/tasks';
  taskForm!: FormGroup;
  taskId!: number;
  ProjectList:IProjectData[]=[]
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TasksService: TasksService,
    private _ToastrService: ToastrService,
    private _Router:Router,
    private _ProjectsService:ProjectsService
  ) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      employeeId: new FormControl(null, [Validators.required]),
      projectId: new FormControl(null, [Validators.required]),
    });

    this.getAllProject()

    this._ActivatedRoute.params
      .pipe(
        tap((params) => {
          console.log(params);
          this.taskId = +params['id'];
          console.log(this.taskId);
        }),
        switchMap((param: Params) => {
          return this.taskId ? this.getTaskData() : of(null);
        })
      )
      .subscribe(
        (taskDetails: ITask | null) => {
          this.addEditText = this.taskId
            ? `Edit${taskDetails?.title.toLocaleUpperCase()}`
            : 'Add New Task';
          if (taskDetails) {
            this.taskForm.patchValue({
              title: taskDetails.title,
              description: taskDetails.description,
              employeeId: taskDetails.employee.id,
              projectId: taskDetails.project.id,
            });
          }
        },
        (err) => {
          this._ToastrService.error(err.message, 'Error');
        }
      );
  }

    // Function to handle form submission
    sendData(data:FormGroup){
      const taskData =data.value;
      const request =this.taskId
      ?this._TasksService.updateTask(this.taskId,taskData)
      :this._TasksService.createTask(taskData);

      request.pipe(
        catchError((error:HttpErrorResponse)=>{
          this._ToastrService.error(error.error.message,'Error');
          throw error
        }),
        finalize(()=>{
          this._ToastrService.success(
            this.taskId?
            'Tasked Updated Successfully'
            :'Tasked Created successFully',
            'Success'
          );
          this._Router.navigateByUrl(this.navigationLink)
        })
      ).subscribe()
    }

  private getTaskData(): Observable<ITask> {
    return this._TasksService.getSingleTask(this.taskId);
  }

  private getAllProject() {
    let param:IProjectParamsRequest = {
      pageSize: 10000,
      pageNumber: 1,
      title:''
    };
    this._ProjectsService.getAllProjects(param).subscribe({

      next: (res: IProjectList) => {
        console.log('res', res);
        this.ProjectList = res.data;
      },
      error: (errRes) => {
        const errMes = errRes.error.message;
        this._ToastrService.error(errMes.error.message,'Error');
      },
      complete: () => {},
    });
  }

  private getAllUsers() {
    let param:IProjectParamsRequest = {
      pageSize: 10000,
      pageNumber: 1,
      title:''
    };
    this._ProjectsService.getAllUsers(param).subscribe({

      next: (res: IProjectList) => {
        console.log('res', res);
        this.ProjectList = res.data;
      },
      error: (errRes:HttpErrorResponse) => {
        this._ToastrService.error(errRes.error.message,'Error');
      },
      complete: () => {},
    });
  }

  get projectId() {
    return this.taskForm.get('projectId');
  }
}