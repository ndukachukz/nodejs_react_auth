declare type User = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  age?: number;
  yrsExp?: number;
  occupation?: string;
  address?: string;
  score?: number;
};

export default User;
