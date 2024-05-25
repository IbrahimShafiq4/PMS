import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProjectData } from '../../models/projects';
import { Observable, of } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss'],
})
export class AddEditProjectComponent implements OnInit {
  navigationLink: string = '/dashboard/manager/projects/';
  projectId: number = 0;
  addEditText: string = '';
  projectForm!: FormGroup;
  viewMode: string = '';

  constructor(
    private _ProjectsService: ProjectsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    this._ActivatedRoute.params
      .pipe(
        tap((params: Params) => {
          this.projectId = +params['id'];
          this.viewMode = params['mood'];
        }),
        switchMap((params: Params) => {
          return this.projectId ? this.getProjectDetails() : of(null);
        })
      )
      .subscribe(
        (projectContentDetails: IProjectData | null) => {
          this.addEditText = this.projectId && this.viewMode
            ? `View "${projectContentDetails!.title.toUpperCase()}"`
            : this.projectId
              ? `Edit "${projectContentDetails!.title.toUpperCase()}"`
              : 'Add New Project';

          if (projectContentDetails) {
            this.projectForm.patchValue({
              title: projectContentDetails.title,
              description: projectContentDetails.description,
            });
          }
        },
        (error) => {
          this._ToastrService.error(error.message, 'Error');
        }
      );

    if (this.projectId && this.viewMode) {
      this.projectForm.disable();
    }
  }

  sendData(projectsFormData: FormGroup): void {
    const projectData = projectsFormData.value;
    const request = this.projectId
      ? this._ProjectsService.updateProject(this.projectId, projectData)
      : this._ProjectsService.onAddProject(projectData);

    request
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._ToastrService.error(error.error.message, 'Error');
          throw error;
        }),
        finalize(() => {
          this._ToastrService.success(
            this.projectId
              ? 'Project Has Been Updated Successfully'
              : 'Project Has Been Added Successfully',
            'Success'
          );

          if (!this.projectId) {
            this._ProjectsService.notifyProjectAdded();
          }

          this._Router.navigate([this.navigationLink]);
        })
      )
      .subscribe();
  }

  private getProjectDetails(): Observable<any> {
    return this._ProjectsService.getSingleProject(this.projectId);
  }

  get title() {
    return this.projectForm.get('title');
  }
  get description() {
    return this.projectForm.get('description');
  }
}
