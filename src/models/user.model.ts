export enum Profiles {
  Admin = 'admin',
  Dev = 'dev',
  Reader = 'reader'
}

export interface Front {
  id?: string;

  name: string;

  email: string;

  password: string;

  passwordConfirmation?: string;

  profile: Profiles;

  phone?: string;

  role?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface Api {
  id?: string;

  name: string;

  email: string;

  password: string;

  profile: Profiles;

  phone?: string;

  role?: string;
}

export interface ApiResponse {
  projectUsers: Array<Record<string, unknown>>;
  _id: string;
  name: string;
  email: string;
  password: string;
  profile: Profiles;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const validate = (user: Front): boolean => {
  return user.password === user.passwordConfirmation;
};
