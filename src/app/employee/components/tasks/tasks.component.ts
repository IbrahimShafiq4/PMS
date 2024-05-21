import { TasksService } from './../../../manager/tasks/services/tasks.service';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ITask, ITaskListResponse } from 'src/app/manager/tasks/models/tasks';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [ SharedModule,
            DragDropModule,


   ]
})
export class TasksComponent {
  MyAssignedTasks:ITask[]=[]
  todo:string[]=[];
  done:string[]=[];
  inProgress:string[]=[];
  constructor(private _TasksService:TasksService){

  }
  ngOnInit(): void {
   this.getMyAssignedTasks()
  }
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  //  inProgress = ['inspection', 'Investegaton', 'Take a brack', 'call me', 'Walk catt'];

  drop(event: CdkDragDrop<string[]>) {
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

  getMyAssignedTasks(){
    let param={
      title: '',
      status: '',
      pageSize: 1000,
      pageNumber: 1,
    }
    this._TasksService.getMyAssignedTasks(param).subscribe({
     next:(res:ITaskListResponse)=>{
    this.MyAssignedTasks=res.data;
    console.log("MyAssignedTasks",this.MyAssignedTasks);

     }
    })
  }
}
