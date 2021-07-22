export interface UserInfo {
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  personal_data_hint: string;
  sub: string;
  updated_at: number;
}

export interface GnsaAuthResponse {
  token: string;
}
