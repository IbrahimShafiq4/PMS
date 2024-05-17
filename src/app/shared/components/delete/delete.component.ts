import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProjectData } from 'src/app/manager/projects/models/projects';
import { ProjectsService } from 'src/app/manager/projects/services/projects.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProjectsService: ProjectsService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}
  deletedItemDetails: IProjectData = {
    id: 0,
    title: '',
    description: '',
    creationDate: '',
    modificationDate: '',
    task: [],
  };
  itemId: number = 0;
  navigatedFrom: string = '';
  backTo: string = '';

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.itemId = +params['id'];
      this.navigatedFrom = params['navigatedFrom'];
    });

    if (this.itemId) {
      this.getSingleProject(this.itemId);
    }

    if (this.navigatedFrom == 'projects') {
      this.backTo = '/dashboard/manager/projects';
    }
  }

  getSingleProject(projectId: number) {
    this._ProjectsService.getSingleProject(projectId).subscribe({
      next: (res) => (this.deletedItemDetails = res),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {  }
    });
  }

  deleteSingleProject() {
    this._ProjectsService.deleteProject(this.itemId).subscribe({
      next: (res) => {  },
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success(
          'Item has been deleted',
          'Success'
        );
        setTimeout(() => {
          this._Router.navigate([this.backTo])
        }, 1000)
      }
    });
  }
}
