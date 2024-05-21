import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectComponent } from './components/project/project.component';
const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path:'projects',component:ProjectComponent},
  { path:'tasks',component:TasksComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule { }
