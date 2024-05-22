import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';

import { TaskBoardComponent } from './task-board/task-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskBoardService } from './services/task-board.service';
import { ProjectsBoardComponent } from './projects-board/projects-board.component';
import { ProjectsBoardService } from './services/projects-board.service';
import { ProjectComponent } from './components/project/project.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    TaskBoardComponent,
    ProjectsBoardComponent,
    TaskBoardComponent,
    ProjectComponent,
  ],
  imports: [CommonModule, EmployeeRoutingModule, DragDropModule, SharedModule],
  providers: [TaskBoardService, ProjectsBoardService],
})
export class EmployeeModule {}
