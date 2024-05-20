import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './components/project/project.component';
import { TasksComponent } from './components/tasks/tasks.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    ProjectComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
