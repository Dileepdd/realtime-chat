export interface IUser {
  username: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
