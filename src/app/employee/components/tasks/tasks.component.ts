import { UpdateProfileComponent } from './../../../shared/components/update-profile/update-profile.component';
import { TasksService } from './../../../manager/tasks/services/tasks.service';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ITask, ITaskListResponse } from 'src/app/manager/tasks/models/tasks';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [SharedModule, DragDropModule],
})
export class TasksComponent {
  MyAssignedTasks: ITask[] = [];
  todo: ITask[] = [];
  done: ITask[] = [];
  inProgress: ITask[] = [];
  previousContainerData: ITask[] = [];
  curentContainerData: ITask[] = [];
  previousIndex: number = 0;
  currentIndex: number = 0;
  constructor(
    private _TasksService: TasksService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getMyAssignedTasks();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    (this.previousContainerData = event.previousContainer.data),
      (this.curentContainerData = event.container.data),
      (this.previousIndex = event.previousIndex),
      (this.currentIndex = event.currentIndex);
    let ItemId: number = 0;
    let mystatusId: string = '';
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //Update the status Api
      ItemId = event.previousContainer.data[this.previousIndex]?.id;
      mystatusId = event.container.id;
      let status = this.statasId(mystatusId);
      this.updateTaskStatus(ItemId, status);
    }
  }
  statasId(staus: string): string {
    if (staus == 'cdk-drop-list-0') {
      return 'ToDo';
    } else if (staus == 'cdk-drop-list-1') {
      return 'InProgress';
    } else if (staus == 'cdk-drop-list-2') {
      return 'Done';
    } else return '';
  }
  updateTaskStatus(taskId: number, status: string) {
    this._TasksService.changeStatusOfTask(taskId, status).subscribe({
      next: (res) => {},
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error(err.error.message, 'Error');
      },
      complete: () => {
        transferArrayItem(
          this.previousContainerData,
          this.curentContainerData,
          this.previousIndex,
          this.currentIndex
        );
        this._ToastrService.success('Item has been Transfered', 'Success');
      },
    });
  }

  getMyAssignedTasks() {
    let param = {
      title: '',
      status: '',
      pageSize: 1000,
      pageNumber: 1,
    };
    this._TasksService.getMyAssignedTasks(param).subscribe({
      next: (res: ITaskListResponse) => {
        this.MyAssignedTasks = res.data;
        this.todo = this.MyAssignedTasks.filter((el) => el.status == 'ToDo');
        this.inProgress = this.MyAssignedTasks.filter(
          (el) => el.status == 'InProgress'
        );
        this.done = this.MyAssignedTasks.filter((el) => el.status == 'Done');
      },
    });
  }
}
