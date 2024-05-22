import { IGetAllTaskRequest, IChangeStatus ,IGetAllTaskResponseData } from './../models/task-board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TaskBoardService } from '../services/task-board.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',

  styleUrls: ['./task-board.component.scss']
})

export class TaskBoardComponent {
  taskRequest: IGetAllTaskRequest = {
    title: '',
    pageNumber: 1,
    pageSize: 10,
  }


  status: IChangeStatus = {
    status: '',
  };

  data: any[] = [];
  todo: any[] = [];
  inPrograss: any[] = [];
  done: any[] = [];

  constructor(private _TaskBoardService: TaskBoardService, private _ToastrService: ToastrService) {
    this.getAllTasks();
  }

  // Get all tasks
  getAllTasks() {
    this._TaskBoardService.getAllEmplyeeTasks(this.taskRequest).subscribe({
      next: (res) => {
        this.data = res.data;
        this.todo = this.data.filter((x) => x.status === 'ToDo');
        this.inPrograss = this.data.filter((x) => x.status === 'InProgress');
        this.done = this.data.filter((x) => x.status === 'Done');
      },
      error: (err: HttpErrorResponse) => { this._ToastrService.error(err.error.message, 'Error') },
      complete: () => {
        
      }
    });
  }

  // Change task status
  changeStatus(id: number, status: IChangeStatus) {
    this._TaskBoardService.changeStatus(id, status).subscribe({
      next: (res) => {  },
      error: (err: HttpErrorResponse) => { this._ToastrService.error(err.error.message, 'Error') },
      complete: () => {  }
    });
  }

  // Get new status based on the container id
  getNewStatus(containerId: string): string {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return 'ToDo';
      case 'cdk-drop-list-1':
        return 'InProgress';
      case 'cdk-drop-list-2':
        return 'Done';
      default:
        return '';
    }
  }

  // Function for drag and drop
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const item = event.container.data[event.currentIndex];
      const newStatus = this.getNewStatus(event.container.id);
      this.changeStatus(item.id, { status: newStatus });
    }
  }
}
