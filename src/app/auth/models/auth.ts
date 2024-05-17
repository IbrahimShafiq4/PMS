export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  expiresIn: string;
}
export interface IRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  profileImage?: string;
  password: string;
  confirmPassword: string;
}

export type IUpdateProfile = Omit<IRegister, 'password'> & {
  confirmPassword: string;
};

// Register Response { message: string }

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export interface IVerify {
  email: string;
  code: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export interface IDecryptedToken {
  role: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  iat: number;
  exp: number;
}

export interface IUserDetails {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  creationDate: string;
  modificationDate: string;
  group: IUserRole
}

export interface IUserRole {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string
}
