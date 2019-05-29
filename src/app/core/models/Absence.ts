import { User } from './User';

export interface Absence {
  id: number;
  start: string;
  end: string;
  title: string;
  description: string;
  user: User;
}
