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

@NgModule({
  declarations: [
    HomeComponent,
    SharedHeaderComponent,
    NavbarComponent,
    SidebarComponent,
    SharedHeaderComponent,
    SharedTableComponent,
    NoDataComponent,
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
    MatCardModule,
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
    MatCardModule,
  ],
  providers: [AuthService, HelperService],
})
export class SharedModule {}
