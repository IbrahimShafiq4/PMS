import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddEditTasksComponent } from './components/add-edit-tasks/add-edit-tasks.component';

const routes: Routes = [{ path: '', component: TasksComponent },
{ path: 'add', component: AddEditTasksComponent,title:'add' },
{ path: 'edit/:id', component: AddEditTasksComponent,title:'edit' },
{ path: 'view/:id', component: AddEditTasksComponent ,title:'view'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
