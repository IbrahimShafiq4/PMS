import { ProjectsService } from './../projects/services/projects.service';
import { AddEditTasksComponent } from './components/add-edit-tasks/add-edit-tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TasksService } from './services/tasks.service';
@NgModule({
  declarations: [
    TasksComponent,
    AddEditTasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ],
  providers:[TasksService,ProjectsService]
})
export class TasksModule { }
