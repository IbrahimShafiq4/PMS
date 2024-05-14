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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  // Variables to toggle password visibility
  hide: boolean = true;
  hideTwo: boolean = true;

  // Form group for reset password form
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      this.passwordMatchValidator.bind(this), // Custom validator for password match
    ]),
  });

  constructor(
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.resetPassword?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMisMatch: true }; // Return error if passwords don't match
    }

    return null; // Return null if passwords match
  }

  // Function to handle reset password submission
  onReset(resetPasswordForm: FormGroup) {
    this._AuthService.resetPassword(resetPasswordForm.value).subscribe({
      next: (res) => {},
      error: (error) => this._ToastrService.error(error.error.message, 'Error'), // Display error message
      complete: () => {
        this._ToastrService.success(
          'Password Has been updated Successfully',
          'Error' // Display success message
        );
        setTimeout(() => {
          this._Router.navigate(['/auth']); // Navigate to authentication page
        }, 500);
      },
    });
  }
}
