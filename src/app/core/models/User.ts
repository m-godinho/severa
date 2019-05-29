import { Address } from '@app/core/models/Address';
import { Worklog } from '@app/core/models/Worklog';
import { Absence } from '@app/core/models/Absence';
export interface User {
  id: number;
  username: string;
  admin: boolean;
  email: string;
  photo: string;
  password: string;
  addresses: Address[];
  worklogs: Worklog[];
  absences: Absence[];
}
