export interface UserType {
  ids?: string;
  _id?: string;
  id?: string;
  username: string;
  password: string;
  roles: string[];
  active: boolean;
}

export interface UserEntity {
  _id?: string | undefined;
  id?: { id: string };
}
export interface Notes {
  ids?: string;
  _id?: string;
  id?: string;
  username: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
