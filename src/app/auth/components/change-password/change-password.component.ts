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
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})

export class ChangePasswordComponent {
  hide: boolean = true;
  hideTwo: boolean = true;

  constructor(
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {
    _ToastrService.info('info', 'info')
  }

  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),
    confirmNewPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),
  });

  // Password and confirm password Match Function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.changePasswordForm?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMisMatch: true };
    }

    return null;
  }

  onChange(newPasswordForm: FormGroup) {
    this._AuthService.changePassword(newPasswordForm.value).subscribe({
      next: (res) => {  },
      error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._ToastrService.success('Password Has been Changed Successfully', 'Success');
        setTimeout(() => {
          this._Router.navigate(['/dashboard'])
        })
      }
    })
  }
}
