import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  // Form group for verification
  verifyForm: FormGroup = new FormGroup({
    // Email form control with validators for required field and email format
    email: new FormControl(null, [Validators.required, Validators.email]),
    // Code form control with validators for required field, and length of 4 digits
    code: new FormControl(null, [
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4),
    ]),
  });

  // Function triggered on verifying the account
  onVerifyAccount(verificationForm: FormGroup) {
    this._AuthService.verifyUserAccount(verificationForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      // Error handling with ToastrService to display error messages
      error: (error: HttpErrorResponse) =>
        this._ToastrService.error(error.error.message, 'Error'),
      // On successful verification, display success message, and navigate to login page
      complete: () => {
        this._ToastrService.success('Account Verified Successfully', 'Success');
        setTimeout(() => {
          this._Router.navigate(['/']);
        }, 500)
      },
    });
  }
}
