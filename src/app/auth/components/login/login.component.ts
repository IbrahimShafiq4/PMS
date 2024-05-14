import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  userName: string = '';

  constructor(
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),
  });

  onLogin(logForm: FormGroup) {
    this._AuthService.login(logForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token);
      },
      error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, 'Error'),
      complete: () => {
        this._AuthService.currentUser().subscribe({
          next: (res) => this.userName = res.userName,
          error: (error: HttpErrorResponse) => this._ToastrService.error(error.error.message, "Error"),
          complete: () => this._ToastrService.success(`Welcome Back ${this.userName}`, 'Success')
        })
        this._Router.navigate(['/dashboard']);
      }
    })
  }
}
