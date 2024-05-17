import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProjectData } from '../../models/projects';
import { interval, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss'],
})
export class AddEditProjectComponent implements OnInit {
  navigationLink: string = '/dashboard/manager/projects/'; // Navigation link for redirection after form submission
  projectId: number = 0; // ID of the project being edited, initialized to 0 for new project
  addEditText: string = ''; // Text for the header indicating whether it's adding or editing a project
  projectForm!: FormGroup; // Form group to manage project data entry

  constructor(
    private _ProjectsService: ProjectsService, // Service for handling project-related operations
    private _ToastrService: ToastrService, // Service for displaying toast notifications
    private _Router: Router, // Router service for navigation
    private _ActivatedRoute: ActivatedRoute // Service to access route parameters
  ) {}

  ngOnInit(): void {
    // Initialize the project form with title and description controls
    this.projectForm = new FormGroup({
      title: new FormControl(null, [Validators.required]), // Title control with required validator
      description: new FormControl(null, [Validators.required]), // Description control with required validator
    });

    // Subscribe to route params to fetch project details if editing an existing project
    this._ActivatedRoute.params
      .pipe(
        tap((params: Params) => {
          console.log(params);

          this.projectId = +params['id']; // Extract project ID from route params
        }),
        switchMap((params: Params) => {
          return this.projectId ? this.getProjectDetails() : of(null); // Fetch project details if project ID is available
        })
      )
      .subscribe(
        // Success callback when project details are fetched
        (projectContentDetails: IProjectData | null) => {
          // Set header text indicating whether it's editing or adding a project
          this.addEditText = this.projectId
            ? `Edit "${projectContentDetails!.title.toUpperCase()}"`
            : 'Add New Project';

          // Populate form controls with project details
          if (projectContentDetails) {
            this.projectForm.patchValue({
              title: projectContentDetails.title,
              description: projectContentDetails.description,
            });
          }
        },
        // Error callback if there's an error fetching project details
        (error) => {
          this._ToastrService.error(error.message, 'Error'); // Display error message in toast notification
        }
      );
  }

  // Function to handle form submission
  sendData(projectsFormData: FormGroup): void {
    const projectData = projectsFormData.value; // Extract form data
    const request = this.projectId
      ? this._ProjectsService.updateProject(this.projectId, projectData) // If project ID exists, update project
      : this._ProjectsService.onAddProject(projectData); // Otherwise, add new project

    request
      .pipe(
        // Handle errors if any occur during API request
        catchError((error: HttpErrorResponse) => {
          this._ToastrService.error(error.error.message, 'Error'); // Display error message in toast notification
          throw error; // Throw error to be caught by finalize operator
        }),
        // Perform actions after completing the API request
        finalize(() => {
          // Display success message in toast notification based on operation (add or update)
          this._ToastrService.success(
            this.projectId
              ? 'Project Has Been Updated Successfully'
              : 'Project Has Been Added Successfully',
            'Success'
          );
          // Redirect user to projects dashboard after successful form submission
          this._Router.navigate([this.navigationLink]);
        })
      )
      .subscribe(); // Subscribe to the API request
  }

  // Function to fetch project details from the API
  private getProjectDetails(): Observable<any> {
    return this._ProjectsService.getSingleProject(this.projectId); // Return observable to fetch project details
  }
}
