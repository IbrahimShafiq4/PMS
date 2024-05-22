import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'angular-highcharts';
import { AuthService } from '../auth/services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoDataComponent } from './components/no-data/no-data.component';
import { HelperService } from './components/services/helper.service';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { FirstTenWordsPipe } from '../core/pipe/FirstTenWords.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ViewComponent } from './components/view/view.component';
import { DeleteComponent } from './components/delete/delete.component';
import { ProjectsService } from '../manager/projects/services/projects.service';
import { DeletePopUpComponent } from './components/delete-pop-up/delete-pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TasksService } from '../manager/tasks/services/tasks.service';
import { SharedCardComponent } from './components/shared-card/shared-card.component';
import { UsersService } from '../manager/users/services/users.service';

@NgModule({
  declarations: [
    HomeComponent,
    SharedHeaderComponent,
    NavbarComponent,
    SidebarComponent,
    SharedHeaderComponent,
    SharedTableComponent,
    NoDataComponent,
    UpdateProfileComponent,
    FirstTenWordsPipe,
    ViewComponent,
    DeleteComponent,
    FirstTenWordsPipe,
    DeletePopUpComponent,
    SharedCardComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    NgxDropzoneModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ChartModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
  ],

  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    NgxDropzoneModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ChartModule,
    HomeComponent,
    SharedHeaderComponent,
    NavbarComponent,
    SidebarComponent,
    MatMenuModule,
    SharedHeaderComponent,
    SharedTableComponent,
    MatCardModule,
    MatPaginatorModule,
    UpdateProfileComponent,
    FirstTenWordsPipe,
    MatSelectModule,
    ViewComponent,
    MatDialogModule,
    SharedCardComponent,
    NoDataComponent
  ],

  providers: [
    AuthService,
    HelperService,
    ProjectsService,
    TasksService,
    UsersService,
  ],
})

export class SharedModule {}
