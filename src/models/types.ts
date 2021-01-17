import { Model, Document } from 'mongoose';

export interface User extends LocalRegisterPayload {
  password: string;
  hash: string;
  salt: string;
}

export interface UserDocument extends User, Document {
  setPassword: (password: string) => void;
  comparePassword: (password: string) => boolean;
  generateToken: () => Promise<string>;
}

export interface UserModel extends Model<UserDocument> {
  localRegister(payload: LocalRegisterPayload): UserDocument;
}

export interface LocalRegisterPayload {
  email: string;
  name: string;
  password: string;
}
