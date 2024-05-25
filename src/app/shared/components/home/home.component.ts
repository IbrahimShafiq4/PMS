import { Component, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ICountedTasks } from 'src/app/employee/models/task-board';
import { TaskBoardService } from 'src/app/employee/services/task-board.service';
import { IProjectList, IProjectParamsRequest } from 'src/app/manager/projects/models/projects';
import { ProjectsService } from 'src/app/manager/projects/services/projects.service';
import { ITaskListResponse, ITasksParameters } from 'src/app/manager/tasks/models/tasks';
import { TasksService } from 'src/app/manager/tasks/services/tasks.service';
import { IActivatedDeactivatedUsers } from 'src/app/manager/users/models/users';
import { UsersService } from 'src/app/manager/users/services/users.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private projectsService = inject(ProjectsService);
  private tasksService = inject(TasksService);
  private usersService = inject(UsersService);
  private taskBoardService = inject(TaskBoardService);

  projectCount: number = 0;
  taskCount: number = 0;
  activatedUserCount: number = 0;
  deactivatedUserCount: number = 0;
  inProgressCount: number = 0;

  ngOnInit(): void {
    this.fetchProjectCount();
    this.fetchTaskCount();
    this.fetchInProgressCount();
    this.fetchUserStatusCounts();
  }

  fetchProjectCount(): void {
    const projectParams: IProjectParamsRequest = {
      pageNumber: 1,
      pageSize: 10000,
    };

    this.projectsService.getAllProjects(projectParams).subscribe({
      next: (response: IProjectList) => {
        this.projectCount = response.data.length;
        this.renderProjectTaskChart();
      }
    });
  }

  fetchTaskCount(): void {
    const taskParams: ITasksParameters = {
      pageNumber: 1,
      pageSize: 10000,
    };

    this.tasksService.getAllMyTasksForManager(taskParams).subscribe({
      next: (response: ITaskListResponse) => {
        this.taskCount = response.data.length;
        this.renderProjectTaskChart();
      }
    });
  }

  fetchInProgressCount(): void {
    this.taskBoardService.countTasksForManagerAndEmployee().subscribe({
      next: (res: ICountedTasks) => {
        this.inProgressCount = res.inProgress;
        this.renderProjectTaskChart();
      }
    });
  }

  fetchUserStatusCounts(): void {
    this.usersService.getActivatedAndDeactivatedUsers().subscribe({
      next: (response: IActivatedDeactivatedUsers) => {
        this.activatedUserCount = response.activatedEmployeeCount;
        this.deactivatedUserCount = response.deactivatedEmployeeCount;
        this.renderUserStatusChart();
      }
    });
  }

  renderProjectTaskChart(): void {
    if (this.projectCount === 0 || this.taskCount === 0 || this.inProgressCount === 0) {
      return;
    }

    const data = {
      labels: ['Projects', 'Tasks', 'InProgress'],
      datasets: [{
        data: [this.projectCount, this.taskCount, this.inProgressCount],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', '#fbb24a'],
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
          text: 'Projects and Tasks Distribution'
        }
      }
    };

    const ctx = document.getElementById('projectTaskChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
      });
    }
  }

  renderUserStatusChart(): void {
    if (this.activatedUserCount === 0 && this.deactivatedUserCount === 0) {
      return;
    }

    const data = {
      labels: ['Activated Users', 'Deactivated Users'],
      datasets: [{
        data: [this.activatedUserCount, this.deactivatedUserCount],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 159, 64)'],
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
          text: 'User Activation Status'
        }
      }
    };

    const ctx = document.getElementById('userStatusChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
      });
    }
  }
}
