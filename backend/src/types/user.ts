export interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  location: string;
  major: string;
  interests?: Array<string>;
}
