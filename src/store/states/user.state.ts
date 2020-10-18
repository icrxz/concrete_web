import * as User from '@/models/user.model';

const InitialFrontState: User.Front = {
  email: '',
  name: '',
  password: '',
  profile: User.Profiles.Admin,
};

export default InitialFrontState;
