import { IGetAllTaskRequest, IChangeStatus } from './../models/task-board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TaskBoardService } from '../services/task-board.service';

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
    status: ''
  }

  data: any[] = [];
  todo: any[] = [];
  inPrograss: any[] = [];
  done: any[] = [];
  statusChange: string = '';
  newStatus: string = '';
  idOfStutsInNewList: number = 0;
  // current elemet that i drag and drop it --> all information of this element(object)
  curentElemet: any;
  //to get id (where exists in db) of status 
  curentElemetId: number = 0;


  constructor(private _TaskBoardService: TaskBoardService) {
    this.getAllTasks();
  }

  //get all tasks
  getAllTasks() {
    this._TaskBoardService.getAllEmplyeeTasks(this.taskRequest).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res.data;
        this.todo = this.data.filter(x => x.status == 'ToDo');
        this.inPrograss = this.data.filter(x => x.status == 'InProgress');
        this.done = this.data.filter(x => x.status == 'Done');
        // console.log(this.data.filter(x => x.status == 'ToDo'))
      },
      error: (err) => { console.log(err) }
    })
  }

  // change task status
  changeStatus(id: number, status: IChangeStatus) {
    this._TaskBoardService.changeStatus(id, status).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //change name of list where task drop in it
  changeListName(listname: string) {
    if (listname == 'cdk-drop-list-0') {
      this.newStatus = 'ToDo'
    } else if (listname == 'cdk-drop-list-1') {
      this.newStatus = 'InProgress'
    } else if (listname == 'cdk-drop-list-2') {
      this.newStatus = 'Done'
    }
  }


  //function for drag and drop
  drop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    setTimeout(() => {
      // to get id of status in new list
      this.idOfStutsInNewList = event.currentIndex;
      this.curentElemet = event.container.data[event.currentIndex];
      this.curentElemetId = this.curentElemet.id;
      // to get name of new status
      this.changeListName(event.container.id);
      this.changeStatus(this.curentElemetId, { status: this.newStatus })
    }, 1000);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



}
