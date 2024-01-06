export interface UsersMeModel {
  last_name: string;
  first_name: string;
  middle_name: string;
  phone: string;
  email: string;
  login: string | unknown;
  password: string | unknown;
  role: string;
  code: string;
  id: string;
  is_active: boolean;
}
