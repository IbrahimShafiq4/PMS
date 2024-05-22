import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from 'src/app/shared/components/view/view.component';


const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'view/:id', component: ViewComponent ,title:'view'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
