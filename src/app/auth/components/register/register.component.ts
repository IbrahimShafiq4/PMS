import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // Used to toggle the password icon
  hide: boolean = true;
  hideTwo: boolean = true;

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

  registerForm = new FormGroup({
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

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),

    confirmPassword: new FormControl(null, [
      Validators.required,
      this.passwordMatchValidator.bind(this),
    ]),
  });

  // Password and confirm password Match Function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.registerForm?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMisMatch: true };
    }

    return null;
  }

  onRegister(registrationForm: FormGroup) {
    this._AuthService.register(registrationForm.value).subscribe({
      next: (res) => (this.userName = registrationForm.value.userName),
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success(`Welcome TO Our PMS ${this.userName}`, 'Success');
        setTimeout(() => {
          this._Router.navigate(['/auth/verify']);
        }, 500)
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
}
