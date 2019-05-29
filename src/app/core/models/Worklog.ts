import { User } from "./User";

export interface Worklog {
  id: number;
  user: User;
  date: string;
  status: string;
  inOne: string;
  outOne: string;
  inTwo: string;
  outTwo: string;
  inThree: string;
  outThree: string;
  inFour: string;
  outFour: string;
  note: string;
}
