import * as User from '@/models/user.model';

export const serialize = (_user: User.Front) => {
  const user: User.Api = {
    id: _user.id,
    name: _user.name,
    password: _user.password,
    email: _user.email,
    profile: _user.profile,
    phone: _user.phone,
    role: _user.role,
  };

  return user;
};

export const deserialize = (resp: User.ApiResponse) => {
  const user: User.Front = {
    id: resp._id,
    name: resp.name,
    email: resp.email,
    profile: resp.profile,
    password: resp.password,
    passwordConfirmation: resp.password,
    phone: resp.phone,
    role: resp.role,
    createdAt: resp.createdAt,
    updatedAt: resp.updatedAt,
  };

  return user;
};
