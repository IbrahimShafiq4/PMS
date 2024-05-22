import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { ProjectsBoardComponent } from './projects-board/projects-board.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  {path:'task-board' , component:TaskBoardComponent},
  {path:'project-board' , component:ProjectsBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
