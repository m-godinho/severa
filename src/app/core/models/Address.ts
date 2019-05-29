import { User } from '@app/core/models/User';

export interface Address {
  id: number;
  street: string;
  postalCode: string;
  district: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  text: string;
  user: User;
}
