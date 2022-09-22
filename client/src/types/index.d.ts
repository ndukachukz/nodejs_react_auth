export interface User {
  id?: string;
  email: string;
  fullName?: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  age?: number;
  yrsExp?: number;
  occupation?: string;
  address?: string;
  score?: number;
}
export interface State {
  signedUid: undefined | string;
  signInError: undefined | string;
  isRegister?: boolean;
  user?: User;
}
