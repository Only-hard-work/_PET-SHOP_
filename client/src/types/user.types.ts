import { Pet } from ".";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
  address: string;
  pets: Pet[];
}
