import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Chart, ChartTypeRegistry, Colors, registerables } from 'chart.js';
import { TasksService } from 'src/app/manager/tasks/services/tasks.service';
import { ProjectsService } from 'src/app/manager/projects/services/projects.service';
import { IProjectData, IProjectList, IProjectParamsRequest } from 'src/app/manager/projects/models/projects';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ICountTasks, ITask, ITaskDetail, ITaskListResponse, ITasksParameters } from 'src/app/manager/tasks/models/tasks';
import { RoleEnum } from 'src/app/core/Enums/RoleEnum.enum';

Chart.register(...registerables);

interface IMenu {
  text: string;
  icon: string;
  link: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() sidebarCollapsed: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('aside') asideElement!: ElementRef;
  @ViewChild('projectTaskChart') projectTaskChartElement!: ElementRef<HTMLCanvasElement>;

  collapsed: boolean = false;
  asideWidth: number = 0;
  textLinkVisibility: boolean = false;
  arrowVisibility: boolean = false;
  createdToday: Date = new Date();
  projectAddedSubscription!: Subscription;
  projectsCreatedToday: number = 0;
  tasksCreatedToday: number = 0;
  RoleEnum=RoleEnum
  chart!: Chart<"pie", number[], string>;

  constructor(
    private _AuthService: AuthService,
    private _TasksService: TasksService,
    private _ProjectService: ProjectsService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit() {
    this.fetchCreatedProjectTodayCount();
    this.fetchCreateTasksTodayCount();
    this.projectAddedSubscription = this._ProjectService.projectAddedSubject.subscribe(() => {
      this.fetchCreatedProjectTodayCount();
    });
  }

  ngAfterViewInit() {
    this.renderProjectTaskChart();
  }

  ngOnDestroy() {
    this.projectAddedSubscription.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.asideWidth = this.asideElement.nativeElement.offsetWidth;
    this.textLinkVisibility = this.asideWidth <= 182;
    this.arrowVisibility = window.innerWidth <= 991;
  }

  isManager(): boolean {
    return this._AuthService.role == this.RoleEnum.MANGER;
  }

  isEmployee(): boolean {
    return this._AuthService.role == this.RoleEnum.EMPLOYEE;
  }

  menu: IMenu[] = [
    {
      text: 'Home',
      link: '/dashboard/home',
      icon: 'fa-solid fa-house',
      isActive: this.isManager() || this.isEmployee(),
    },
    {
      text: 'Users',
      link: '/dashboard/manager/users',
      icon: 'fa-solid fa-users',
      isActive: this.isManager(),
    },
    {
      text: 'Projects',
      link: '/dashboard/employee/project-board',
      icon: 'fa-solid fa-bars-progress',
      isActive: this.isEmployee(),
    },
    {
      text: 'Tasks',
      link: '/dashboard/employee/task-board',
      icon: 'fa-solid fa-heart',
      isActive: this.isEmployee(),
    },
    {
      text: 'Projects',
      link: '/dashboard/manager/projects',
      icon: 'fa-solid fa-list-check',
      isActive: this.isManager(),
    },
    {
      text: 'Tasks',
      link: '/dashboard/manager/tasks',
      icon: 'fa-solid fa-layer-group',
      isActive: this.isManager(),
    },
  ];

  collapsing(): void {
    this.collapsed = !this.collapsed;
    this.sidebarCollapsed.emit(this.collapsed);
  }

  fetchCreatedProjectTodayCount() {
    let projectParams: IProjectParamsRequest = {
      pageNumber: 1,
      pageSize: 1000
    };

    this._ProjectService.getAllProjects(projectParams)
      .pipe(
        map((response: IProjectList) => {
          const today = this.formatDate(this.createdToday);
          const projectsToday = response.data.filter((project: IProjectData) => {
            return this.formatDate(new Date(project.creationDate)) === today;
          });
          return projectsToday.length;
        })
      )
      .subscribe(
        (count: number) => {
          this.projectsCreatedToday = count;
          if (this.chart) {
            this.chart.destroy();
          }
          this.renderProjectTaskChart();
        },
        (error: HttpErrorResponse) => {
          this._ToastrService.error(error.error.message, 'Error');
        }
      );
  }

  fetchCreateTasksTodayCount() {
    const taskParams: ITasksParameters = {
      pageNumber: 1,
      pageSize: 1000
    }
    this._TasksService.getAllMyTasksForManager(taskParams).pipe(
      map((response: ITaskListResponse) => {
        const today = this.formatDate(this.createdToday);
        const tasksToday = response.data.filter((task: ITaskDetail) => {
          return task.creationDate && this.formatDate(new Date(task.creationDate)) === today;
        });
        return tasksToday.length;
      })
    )
    .subscribe(
      (count: number) => {
        this.tasksCreatedToday = count;
        console.log(count);
        if (this.chart) {
          this.chart.destroy();
        }
        this.renderProjectTaskChart();
      },
      (error: HttpErrorResponse) => {
        this._ToastrService.error(error.error.message, 'Error');
      }
    );
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  renderProjectTaskChart(): void {
    if (this.projectsCreatedToday === 0 && this.tasksCreatedToday === 0) {
      return;
    }

    const data = {
      labels: ['Projects', 'Tasks'],
      datasets: [{
        data: [this.projectsCreatedToday, this.tasksCreatedToday],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(75, 192, 192)'],
        hoverOffset: 4
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Projects, Tasks of Today',
        }
      }
    };

    const ctx = this.projectTaskChartElement.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
      });
    }
  }
}
