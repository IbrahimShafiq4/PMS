import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  imgUrl: string = 'https://upskilling-egypt.com:3003/';

  // userName that will be set to the toastr
  userName: string = '';

  constructor(
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser()
  }

  // used for storing the images
  files: File[] = [];

  // used for storing images src to the `imgSrc` variable
  imgSrc: any;

  updateForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern(/^[A-Za-z][A-Za-z0-9]*[0-9]$/),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),

    country: new FormControl('', [Validators.required]),

    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
      Validators.maxLength(12),
    ]),

    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
  });

  onUpdate(updateForm: FormGroup) {
    const updateData = new FormData();
    Object.entries<string>(updateForm.value).forEach(([key, value]) => {
      updateData.append(key, value)
    })
    updateData.append('profileImage', this.imgSrc)

    this._AuthService.updateProfile(updateData).subscribe({
      next: (res) => (this.userName = updateForm.value.userName),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success(
          `Account updated Successfully`,
          'Success'
        );
        this.getCurrentUser();
        this._Router.navigate(['/dashboard'])
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
      next: (res) => {
        userData = res
        this._AuthService.notifyUserDataChange(res); // Notify user data change
      },
      error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {

        this.imgSrc =  this.imgUrl + userData.imagePath;
        this.updateForm.patchValue({
          userName: userData.userName,
          email: userData.email,
          country: userData.country,
          phoneNumber: userData.phoneNumber,
        })
      }
    })
  }
}
