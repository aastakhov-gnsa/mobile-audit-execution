export interface GnsaUser {
  firstName: string;
  patronymic: string;
  lastName: string;
  fullName: string;
  login: string;
  internalRole: {key: string};
}
