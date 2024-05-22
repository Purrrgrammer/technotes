export interface User {
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
  username: string;
  title: string;
  text: string;
  completed: boolean;
}
