import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProjectData } from 'src/app/manager/projects/models/projects';
import { ProjectsService } from 'src/app/manager/projects/services/projects.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  constructor(private _ActivatedRoute: ActivatedRoute , private _ProjectsService: ProjectsService, private _ToastrService: ToastrService) {  }
  viewedItemDetails: IProjectData = {
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
      this.itemId = +params['id']
      this.navigatedFrom = params['navigatedFrom']
    })

    if (this.itemId) {
      this.getSingleProject(this.itemId)
    }

    if (this.navigatedFrom == 'projects') {
      this.backTo = '/dashboard/manager/projects'
    }
  }

  getSingleProject(projectId: number) {
    this._ProjectsService.getSingleProject(projectId).subscribe({
      next: (res) => this.viewedItemDetails = res,
      error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, 'Error'),
      complete: () => this._ToastrService.success('Project details has been Retrieved', 'Success')
    })
  }
}
