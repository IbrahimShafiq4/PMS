import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUserDetails } from 'src/app/auth/models/auth';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent {

  hideTwo: boolean = true;

  updateView: boolean = true;

  // userName that will be set to the toastr
  userName: string = '';

  constructor(
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  // used for storing the images
  files: File[] = [];

  // used for storing images src to the `imgSrc` variable
  imgSrc: any;

  updateForm = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern(/^[A-Za-z][A-Za-z0-9]*[0-9]$/),
    ]),

    email: new FormControl(null, [Validators.required, Validators.email]),

    country: new FormControl(null, [Validators.required]),

    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
      Validators.maxLength(12),
    ]),

    confirmPassword: new FormControl(null, [
      Validators.required,
    ]),
  });

  onUpdate(registrationForm: FormGroup) {
    this._AuthService.register(registrationForm.value).subscribe({
      next: (res) => (this.userName = registrationForm.value.userName),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success(
          `Welcome TO Our PMS ${this.userName}`,
          'Success'
        );
        setTimeout(() => {
          this._Router.navigate(['/auth/verify']);
        }, 500);
      },
    });
  }

  // Selecting image using ngx-dropzone
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  // removing image using ngx-dropzone
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getCurrentUser() {
    let userData!: IUserDetails;
    this._AuthService.currentUser().subscribe({
      next: (res) => userData = res,
      error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this.imgSrc = userData.imagePath;
        this.updateForm.patchValue({
          // userName: userData.userName,
          // email: userData.email,
          // country: userData.country,
          // phoneNumber: userData.phoneNumber,
        })
      }
    })
  }
}
