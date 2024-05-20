import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUserDetails } from 'src/app/auth/models/auth';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  currentUserData: IUserDetails = {
    imagePath: '',
    userName: '',
    country: '',
    creationDate: '',
    email: '',
    group: {
      creationDate: '',
      id: 0,
      modificationDate: '',
      name: '',
    },
    id: 0,
    modificationDate: '',
    phoneNumber: '',
  };
  imgBaseUrl: string = 'https://upskilling-egypt.com:3003/';
  emptyUserImage: string = '../../../../assets/images/profile.jpeg';

  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this._AuthService.userDataChange$.subscribe((newUserData) => {
      this.currentUserData = newUserData;
    });
  }

  getCurrentUser() {
    this._AuthService.currentUser().subscribe({
      next: (res) => {
        this.currentUserData = res;
      },
      error: (error) => this._ToastrService.error(error.error.message, 'Error'),
    });
  }

  logout() {
    localStorage.clear();
    this._Router.navigate(['/auth']);
  }
}
