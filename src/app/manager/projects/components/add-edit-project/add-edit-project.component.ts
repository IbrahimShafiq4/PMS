import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent {

  constructor(private _ProjectsService: ProjectsService, private _ToastrService: ToastrService) { }

  
  //add form
  projectForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });


  // add data function
  sendData(data: FormGroup) {
    console.log(data.value);
    this._ProjectsService.onAddProject(data.value).subscribe({
      next: (res) => {
        //console.log(res);
        this._ToastrService.success('New Project Adding Successfuly ' , 'Success');
      },
      error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, 'Error')

    })


  }

}
