import {
  ILogin,
  ILoginResponse,
  IRegister,
  IUpdateProfile,
  IUserDetails,
  IVerify,
  IResetPassword,
  IDecryptedToken,
  IChangePassword,
} from './../../models/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Used to stored the user token
  userToken: string = '';

  // Used to store the role of the User
  role: string = '';

  private userDataChange: Subject<IUserDetails> = new Subject<IUserDetails>();

  constructor(private _HttpClient: HttpClient) {
    // Check if userToken exists in localStorage, if yes, get user profile
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
      this.userToken = localStorage.getItem('userToken') ?? '';
    }
  }

  // Observable to allow components to subscribe to user data changes
  userDataChange$ = this.userDataChange.asObservable();

  // Function to notify about user data changes
  notifyUserDataChange(userData: IUserDetails) {
    this.userDataChange.next(userData);
  }

  // Function To handle user login
  login(loginData: ILogin): Observable<ILoginResponse> {
    return this._HttpClient.post<ILoginResponse>('Users/Login', loginData);
  }

  // Function to handle user registration
  register(registrationData: IRegister): Observable<{ message: string }> {
    return this._HttpClient.post<{ message: string }>(
      'Users/Register',
      registrationData
    );
  }

  // Function to verify user account
  verifyUserAccount(
    verificationData: IVerify
  ): Observable<{ message: string }> {
    return this._HttpClient.put<{ message: string }>(
      'Users/verify',
      verificationData
    );
  }

  // Function to change user password
  changePassword(
    passwordData: IChangePassword
  ): Observable<{ message: string }> {
    return this._HttpClient.put<{ message: string }>(
      'Users/ChangePassword',
      passwordData
    );
  }

  currentUser(): Observable<IUserDetails> {
    return this._HttpClient.get<IUserDetails>('Users/CurrentUser');
  }

  // Function to request password change
  requestToChangePassword(email: string): Observable<{ message: string }> {
    return this._HttpClient.post<{ message: string }>(
      'Users/Reset/Request',
      email
    );
  }

  // Function to reset user password
  resetPassword(passwordData: IResetPassword): Observable<{ message: string }> {
    return this._HttpClient.post<{ message: string }>(
      'users/Reset',
      passwordData
    );
  }

  // Function to get user profile from token
  getProfile() {
    let encoded: string | null = localStorage.getItem('userToken');
    if (encoded != null) {
      let decoded: IDecryptedToken = jwtDecode(encoded);
      localStorage.setItem('role', decoded.userGroup);
      localStorage.setItem('userName',decoded.userName)
      this.getRole(); // Get user role
    }
  }

  // Function to get user role from localStorage
  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role') !== null
    ) {
      this.role = localStorage.getItem('role') ?? '';
    }
  }

  // Function to update the current user data
  updateProfile(
    profileUpdatingData: FormData
  ): Observable<{ message: string }> {
    return this._HttpClient.put<{ message: string }>(
      `Users`,
      profileUpdatingData
    );
  }

  welcomeVoice(message: string) {
    const sp = new SpeechSynthesisUtterance(message);
    [sp.voice] = speechSynthesis.getVoices();
    speechSynthesis.speak(sp);
  }
}
