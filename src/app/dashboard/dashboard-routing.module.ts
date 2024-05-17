import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../shared/components/home/home.component';
import { UpdateProfileComponent } from '../shared/components/update-profile/update-profile.component';
import { ViewComponent } from '../shared/components/view/view.component';
import { DeleteComponent } from '../shared/components/delete/delete.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      {
        path: 'manager',
        loadChildren: () =>
          import('../manager/manager.module').then((m) => m.ManagerModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent,
        title: 'Update Profile',
      },
      {
        path: 'view/:id/:navigatedFrom',
        component: ViewComponent,
        title: 'View',
      },
      {
        path: 'delete/:id/:navigatedFrom',
        component: DeleteComponent,
        title: 'Delete',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
